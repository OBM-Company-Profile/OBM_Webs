import Card from "../../component/Card";
import Footer from "../../component/Footer";
import Navbar from "../../component/Navbar";
import FasilitasCard from "../../component/fasilitas/FasilitasCard";
import Navs from "../../component/Navs";
import Jumbotron from "../../component/Jumbotron";
import axios from "axios";
import { useState, useEffect } from "react";
import LoadingAnimation from "../../component/LoadingAnimation";

interface ImageData {
  id: number;
  imageSrc: string;
  altImage: string;
  category: string;
}

interface KantorData {
  id: number;
  type: string;
  name: string;
  address: string;
}

const Kantor = () => {
  const links = [
    { path: "/fasilitas", label: "Kapal" },
    { path: "/fasilitas/mobil", label: "Mobil" },
    { path: "/fasilitas/kantor", label: "Kantor" },
  ];

  const [jumbotron, setJumbotron] = useState<ImageData[]>([]);
  const [images, setImages] = useState<ImageData[]>([]);
  const [kantorList, setKantorList] = useState<KantorData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [quotation, setQuotation] = useState<ImageData[]>([]);

  useEffect(() => {
    const fetchJumbotron = async () => {
      try {
        const response = await axios.get(
          "https://app.orelabahari.co.id/api/images",
          {
            params: { category: "jumbotron" },
          }
        );
        setJumbotron(response.data);
      } catch (error) {
        setError("Failed to fetch image");
      }
    };

    fetchJumbotron();
  }, []);

  const banner = jumbotron[10] || { imageSrc: "", altImage: "" };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://app.orelabahari.co.id/api/images",
          {
            params: { category: "fasilitas_kantor" },
          }
        );
        setImages(response.data);
      } catch (err) {
        setError("Failed to fetch images");
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const response = await axios.get(
          "https://app.orelabahari.co.id/api/images",
          {
            params: { category: "service" },
          }
        );
        setQuotation(response.data);
      } catch (err) {
        setError("Failed to fetch images");
      }
    };

    fetchQuotation();
  }, []);

  const offering = quotation[0] || { imageSrc: "", altImage: "" };

  useEffect(() => {
    const fetchKantorData = async () => {
      try {
        const response = await axios.get<KantorData[]>(
          "https://app.orelabahari.co.id/api/kantor_list"
        );
        setKantorList(response.data);
      } catch (error) {
        console.error("Error fetching kantor data", error);
      }
    };

    fetchKantorData();
  }, []);

  const formatData = (kantor: KantorData) => {
    const formattedData = [
      { label: "Alamat", value: kantor.address || "N/A" },
    ].filter((item) => item.value !== "N/A");
    return formattedData;
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!kantorList.length || !images.length) {
    return <LoadingAnimation />;
  }

  return (
    <>
      <Navbar />
      <Jumbotron
        bgImage={banner.imageSrc}
        headCaption="Fasilitas"
        captionSection="Armada pendukung"
        showButton={false}
        btnAction="none"
      />
      <Navs links={links} />
      {kantorList.map((kantor, index) => {
        const image = images[index] || { imageSrc: "" }; // Safely access the image
        return (
          <FasilitasCard
            key={kantor.id}
            imgAsset={image.imageSrc}
            asstType={kantor.type}
            asstName={kantor.name}
            col={[]}
            data={formatData(kantor)}
          />
        );
      })}
      <Card
        imageContent={offering.imageSrc}
        contentTitle="Ajukan Permintaan Penawaran"
        captionText="Kami siap 24 jam untuk membantu Anda"
        captionText1="Telp : +62 2974 3107 HP : +628121919822 Mail :
            enquiries@orelabahari.co.id"
        btnAction="Offering"
      />
      <Footer />
    </>
  );
};

export default Kantor;
