import Navbar from "../../../component/Navbar";
import operatorData from "../../../json/marine/shipOperator.json";
import Footer from "../../../component/Footer";
import Card from "../../../component/Card";
import Navs from "../../../component/Navs";
import ServiceComponent from "../../../component/ServiceComponent";
import Jumbotron from "../../../component/Jumbotron";
import Carousel from "../../../component/Carousel";
import axios from "axios";
import { useState, useEffect } from "react";

interface ImageData {
  id: number;
  imageSrc: string;
  altImage: string;
  category: string;
}

const ShipOperator = () => {
  const links = [
    {
      path: "/layanan/marine",
      label: "Offshore Support",
    },
    { path: "/layanan/marine/ship-to-ship", label: "Ship to Ship" },
    { path: "/layanan/marine/ship-operator", label: "Ship Operator" },
    { path: "/layanan/marine/ship-owner", label: "Ship Owner" },
    {
      path: "/layanan/marine/fpso",
      label: "FPSO",
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
  const banner = jumbotron[4] || { imageSrc: "", altImage: "" };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:3307/api/images", {
          params: { category: "marine_operator" },
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
          params: { category: "marine_operator" }, // Specify category
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
        headCaption="Marine"
        captionSection="Penghubung bisnis intermoda transportasi dan pengelolaan potensi ekonomi sumber daya laut"
        btnAction="none"
        showButton={false}
      />
      <Navs links={links} />
      <ServiceComponent
        title={operatorData.title}
        paragraphs={operatorData.paragraphs}
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
export default ShipOperator;
