import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PageShell from "../components/PageShell";
import ListingEditorForm from "../components/ListingEditorForm";
import Spinner from "../components/Spinner";

function EditListing() {
  // eslint-disable-next-line
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  });

  const { address, offer, regularPrice, discountedPrice, images, latitude, longitude } =
    formData;

  const auth = getAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const isMounted = useRef(true);
  const imageCount = images?.length ?? 0;
  const userId = auth.currentUser?.uid;

  // Redirect if listing is not user's
  useEffect(() => {
    if (listing && userId && listing.userRef !== userId) {
      toast.error("You can not edit this listing");
      navigate("/");
    }
  }, [listing, navigate, userId]);

  // Fetch listing to edit
  useEffect(() => {
    setLoading(true);
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setFormData({ ...docSnap.data(), address: docSnap.data().location });
        setLoading(false);
      } else {
        navigate("/");
        toast.error("Listing does not exists");
      }
    };

    fetchListing();
  }, [params.listingId, navigate]);

  // Sets userRef to logged in user
  useEffect(() => {
    if (isMounted.current) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData((prevState) => ({ ...prevState, userRef: user.uid }));
        } else {
          navigate("/sign-in", { replace: true, state: { from: location } });
        }
      });

      return () => {
        isMounted.current = false;
        unsubscribe();
      };
    }

    return undefined;
  }, [auth, location, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (offer && Number(discountedPrice) >= Number(regularPrice)) {
      setLoading(false);
      toast.error("Discounted price needs to be less than regular price");
      return;
    }

    if (imageCount > 6) {
      setLoading(false);
      toast.error("You can use max 6 images");
      return;
    }

    let geolocation = {};

    if (geolocationEnabled) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
      );

      const data = await response.json();

      geolocation.lat = data[0]?.lat || 0;
      geolocation.lng = data[0]?.lon || 0;

      if (data.length === 0) {
        setLoading(false);
        toast.error("Please enter a correct address");
        return;
      }
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
    }

    const storeImage = async (image) => {
      try {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "default_preset"); // Replace with your Cloudinary upload preset
        formData.append("cloud_name", "dph4eymbk"); // Replace with your Cloudinary cloud name

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dph4eymbk/image/upload`, // Replace 'your_cloud_name'
          formData
        );

        if (response.status === 200) {
          console.log("Upload successful:", response.data.secure_url);
          return response.data.secure_url; // Returns the URL of the uploaded image
        } else {
          throw new Error("Failed to upload image");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
      }
    };

    let imageUrls = listing.imageUrls;

    if (imageCount > 0) {
      imageUrls = await Promise.all(
        [...images].map((image) => storeImage(image))
      ).catch(() => {
        setLoading(false);
        toast.error("Images not uploaded");
        return;
      });
    }

    if (!imageUrls) {
      return;
    }

    const formDataCopy = {
      ...formData,
      imageUrls,
      geolocation,
      timestamp: serverTimestamp(),
    };

    formDataCopy.location = address;
    delete formDataCopy.images;
    delete formDataCopy.address;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;

    try {
      // Upadate Listing
      const docRef = doc(db, "listings", params.listingId);
      await updateDoc(docRef, formDataCopy);

      setLoading(false);
      toast.success("Successfully updated listing");
      navigate(`/category/${formDataCopy.type}/${docRef.id}`);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!!!");
      return;
    }

    setLoading(false);
  };

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    // Text / Boolean / Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <PageShell
      eyebrow="Listing Editor"
      title="Edit listing"
      subtitle="Update pricing, details, and visuals without losing the cleaner presentation of the listing."
    >
      <ListingEditorForm
        formData={formData}
        geolocationEnabled={geolocationEnabled}
        imageRequired={false}
        imageLabel="Replace Images"
        imageDescription="Leave this empty to keep the current gallery. Upload up to six new files if you want to replace it."
        galleryCount={listing?.imageUrls?.length ?? 0}
        submitLabel="Save Listing"
        sidebarEyebrow="Editing notes"
        sidebarTitle="Keep the presentation sharp"
        sidebarDescription="Small changes to pricing, naming, and imagery often improve the listing more than adding extra text."
        sidebarPoints={[
          "Refresh pricing when the market changes so discounts and offer badges stay credible.",
          "Replace images only when the new first photo is stronger than the current cover image.",
          "Tighten the name and address clarity before making cosmetic changes elsewhere.",
        ]}
        onMutate={onMutate}
        onSubmit={onSubmit}
      />
    </PageShell>
  );
}

export default EditListing;
