import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../component/Card";
import Footer from "../../component/Footer";
import Navbar from "../../component/Navbar";
import FasilitasCard from "../../component/fasilitas/FasilitasCard";
import Navs from "../../component/Navs";
import Jumbotron from "../../component/Jumbotron";

interface ImageData {
  id: number;
  imageSrc: string;
  altImage: string;
}

interface MobilData {
  id: number;
  type: string;
  name: string;
  brand: string;
  capacity: string;
  year: string;
  totalUnit: string;
}

const Mobil = () => {
  const links = [
    { path: "/fasilitas", label: "Kapal" },
    { path: "/fasilitas/mobil", label: "Mobil" },
    { path: "/fasilitas/kantor", label: "Kantor" },
  ];

  const [jumbotron, setJumbotron] = useState<ImageData[]>([]);
  const [images, setImages] = useState<ImageData[]>([]);
  const [mobilList, setMobilList] = useState<MobilData[]>([]);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJumbotron = async () => {
      try {
        const response = await axios.get("http://localhost:3307/api/images", {
          params: { category: "jumbotron" },
        });
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
        const response = await axios.get("http://localhost:3307/api/images", {
          params: { category: "fasilitas_mobil" },
        });
        setImages(response.data);
      } catch (err) {
        setError("Failed to fetch images");
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const fetchMobilData = async () => {
      try {
        const response = await axios.get<MobilData[]>(
          "http://localhost:3307/api/mobil_list"
        );
        setMobilList(response.data);
      } catch (error) {
        console.error("Error fetching mobil data:", error);
      }
    };

    fetchMobilData();
  }, []);

  const formatData = (mobil: MobilData) => {
    const formattedData = [
      { label: "Brand", value: mobil.brand || "N/A" },
      { label: "Capacity", value: mobil.capacity || "N/A" },
      { label: "Year", value: mobil.year || "N/A" },
      { label: "Total Unit", value: mobil.totalUnit || "N/A" },
    ].filter((item) => item.value !== "N/A"); // Filter out items with default 'N/A' value if needed
    return formattedData;
  };

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
      {mobilList.map((mobil, index) => {
        const image = images[index];
        return (
          <FasilitasCard
            key={mobil.id}
            imgAsset={image.imageSrc}
            asstType={mobil.type}
            asstName={mobil.name}
            col={[]} // No need to pass columns now
            data={formatData(mobil)} // Pass formatted data
          />
        );
      })}
      <Card
        imageContent="../img/service/offering.jpg"
        contentTitle="Ajukan Permintaan Penawaran"
        captionText="Kami siap 24 jam untuk membantu Anda"
        captionText1="Telp : +62-2974-3107 HP : +628121919822 Mail :
            enquiries@orelabahari.co.id"
        btnAction="Offering"
      />
      <Footer />
    </>
  );
};

export default Mobil;
