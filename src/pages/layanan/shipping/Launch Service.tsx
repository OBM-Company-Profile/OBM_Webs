import Navbar from "../../../component/Navbar";
import Jumbotron from "../../../component/Jumbotron";
import ServiceComponent from "../../../component/ServiceComponent";
import Footer from "../../../component/Footer";
import Carousel from "../../../component/Carousel";
import launchData from "../../../json/shipping/launchService.json";
import Card from "../../../component/Card";
import Navs from "../../../component/Navs";
import axios from "axios";
import { useState, useEffect } from "react";

interface ImageData {
  id: number;
  imageSrc: string;
  altImage: string;
  category: string;
}

const LaunchService = () => {
  const links = [
    {
      path: "/layanan/shipping",
      label: "Shipping Agency",
    },
    { path: "/layanan/shipping/husbandry-service", label: "Husbandry Service" },
    {
      path: "/layanan/shipping/protecting-agency",
      label: "Owner Protecting Agent",
    },
    { path: "/layanan/shipping/launch-service", label: "Launch Service" },
    {
      path: "/layanan/shipping/emergency-response",
      label: "Emergency Response",
    },
  ];

  const [jumbotron, setJumbotron] = useState<ImageData[]>([]);
  const [images, setImages] = useState<ImageData[]>([]);
  const [carousel, setCarousel] = useState<ImageData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quotation, setQuotation] = useState<ImageData[]>([]);

  useEffect(() => {
    const fetchJumbotron = async () => {
      try {
        const response = await axios.get("http://localhost:3307/api/images", {
          params: { category: "jumbotron" },
        });
        setJumbotron(response.data);
      } catch (err) {
        setError("Failed to fetch image");
      }
    };

    fetchJumbotron();
  }, []);
  const banner = jumbotron[3] || { imageSrc: "", altImage: "" };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:3307/api/images", {
          params: { category: "shipping_launch" },
        });
        setImages(response.data);
      } catch (err) {
        setError("Failed to fetch image");
      }
    };

    fetchImages();
  }, []);

  // Using the first image from category
  const firstImage = images[0] || { imageSrc: "", altImage: "" };

  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const response = await axios.get("http://localhost:3307/api/images", {
          params: { category: "service" },
        });
        setQuotation(response.data);
      } catch (err) {
        setError("Failed to fetch images");
      }
    };

    fetchQuotation();
  }, []);

  const offering = quotation[0] || { imageSrc: "", altImage: "" };

  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        const response = await axios.get("http://localhost:3307/api/images", {
          params: { category: "shipping_launch" }, // Specify category
        });
        // Exclude the first image
        const carousel = response.data;
        setCarousel(carousel.slice(1)); // Exclude the first image
      } catch (err) {
        setError("Failed to fetch images");
      } finally {
        setLoading(false);
      }
    };

    fetchCarousel();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Prepare items for Carousel component
  const carouselItems = carousel.map((carousel) => (
    <img
      key={carousel.id}
      src={carousel.imageSrc}
      alt={carousel.altImage}
      className="w-full h-full lg:h-[200px] object-cover"
    />
  ));

  return (
    <>
      <Navbar />
      <Jumbotron
        bgImage={banner.imageSrc}
        headCaption="Shipping"
        captionSection="Melayani clearence CIQP dan sebagai mata rantai logistik kebutuhan kapal"
        btnAction="none"
        showButton={false}
      />
      <Navs links={links} />
      <ServiceComponent
        title={launchData.title}
        paragraphs={launchData.paragraphs}
        imageSrc={firstImage.imageSrc}
        altImage={firstImage.altImage}
      />
      <Carousel items={carouselItems} />
      <div className="bg-pr08">
        <Card
          imageContent={offering.imageSrc}
          contentTitle="Ajukan Permintaan Penawaran"
          captionText="Kami siap 24 jam untuk membantu Anda"
          captionText1="Telp : +62 2974 3107 HP : +628121919822 Mail :
            enquiries@orelabahari.co.id"
          btnAction="Offering"
        />
      </div>
      <Footer />
    </>
  );
};

export default LaunchService;
