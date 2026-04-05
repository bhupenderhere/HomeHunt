import axios from "axios";

import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageShell from "../components/PageShell";
import ListingEditorForm from "../components/ListingEditorForm";
import Spinner from "../components/Spinner";

function CreateListing() {
  // eslint-disable-next-line
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
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
  const navigate = useNavigate();
  const imageCount = images?.length ?? 0;
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (userId) {
      setFormData((prevState) => ({ ...prevState, userRef: userId }));
    }
  }, [userId]);

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

    if (imageCount === 0) {
      setLoading(false);
      toast.error("Please upload at least one image");
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

    const imageUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });

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
      const docRef = await addDoc(collection(db, "listings"), formDataCopy);
      setLoading(false);
      toast.success("Listing saved");
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
      eyebrow="New Listing"
      title="Create a listing"
      subtitle="Add your property details, upload strong imagery, and publish a cleaner listing page."
    >
      <ListingEditorForm
        formData={formData}
        geolocationEnabled={geolocationEnabled}
        imageRequired
        imageLabel="Images"
        imageDescription="The first image becomes the cover photo. Upload up to six files."
        galleryCount={0}
        submitLabel="Create Listing"
        sidebarEyebrow="Publishing tips"
        sidebarTitle="Make the first impression count"
        sidebarDescription="A stronger cover image, a direct title, and clear pricing do more work than extra filler text."
        sidebarPoints={[
          "Use a listing name that describes the property clearly instead of generic filler.",
          "Lead with a bright exterior or living-space image so the first card earns the click.",
          "When an offer is active, keep the discount meaningful and the pricing logic easy to trust.",
        ]}
        onMutate={onMutate}
        onSubmit={onSubmit}
      />
    </PageShell>
  );
}

export default CreateListing;
