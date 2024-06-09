"use client";
import Navbar from "@/app/dashboard/Navbar";
import { LoadingOverlay } from "@mantine/core";
import { useState, useEffect } from "react";
import classes from "../../Records.module.css";
import { IconX } from "@tabler/icons-react";
import Image from "next/image";

export default function Page({ params }: any) {
  const [userData, setUserData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState(null);

  useEffect(() => {
    function fetchUserData() {
      fetch(`/api/users/${params.id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          setUserData(data);

          setVisible(false);
        })
        .catch((error) => {
          setVisible(false);
        });
    }

    setVisible(true);
    fetchUserData();
  }, [params.id]);

  // const CustomModal = ({ isOpen, handleOnImageClose, imageUrl }: any) => {
  //   if (!isOpen) return null;
  //   return (
  //     <>
  //       <div className={classes.modal_overlay} onClick={handleOnImageClose} />
  //       <div className={classes.modal}>
  //         <div className={classes.close_button} onClick={handleOnImageClose}>
  //           <IconX
  //             width={20}
  //             height={20}
  //             stroke={3}
  //             color="#ffffff"
  //             onClick={handleOnImageClose}
  //           />
  //         </div>
  //         <div className={classes.modal_content}>
  //           <img src={imageUrl} alt="image" />
  //         </div>
  //       </div>
  //     </>
  //   );
  // };
  const CustomModal = ({ isOpen, handleOnImageClose, imageUrl }: any) => {
    if (!isOpen) return null;
    return (
      <>
        <div className={classes.modal_overlay} onClick={handleOnImageClose} />
        <div className={classes.modal}>
          <div className={classes.close_button} onClick={handleOnImageClose}>
            <IconX
              width={20}
              height={20}
              stroke={3}
              color="#ffffff"
              onClick={handleOnImageClose}
            />
          </div>
          <div className={classes.modal_content}>
            <img src={imageUrl} alt="image" />
          </div>
        </div>
      </>
    );
  };

  const handleOnImageOpen = (imageUrl: any) => {
    setSelectedPreviewUrl(imageUrl);
  };

  const handleOnImageClose = () => {
    setSelectedPreviewUrl(null);
  };

  const LoaderOverlay = ({ visible }: { visible: boolean }) => {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: visible ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          pointerEvents: "none",
        }}
      >
        <LoadingOverlay
          visible={visible}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ color: "blue", type: "bars" }}
        />
      </div>
    );
  };
  return (
    <>
      <Navbar />
      <LoaderOverlay visible={visible} />
      {/* <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "blue", type: "bars" }}
      /> */}
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-xxl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mx-8">
          <div className="p-6">
            <h1 className="text-3xl font-semibold text-center mb-6">
              {userData?.username || "User Profile"}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {[userData?.image1, userData?.image2, userData?.image3].map(
                (src, index) => (
                  <div
                    key={index}
                    className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOnImageOpen(src);
                    }}
                  >
                    {src ? (
                      <Image
                        src={src}
                        alt={`Image ${index + 1}`}
                        width={400}
                        height={400}
                        layout="responsive"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        className="object-cover w-full h-full transform hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center bg-gray-200 w-full h-full text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Personal Info
              </h2>
              <table className="w-full table-fixed border-collapse border border-gray-300 rounded-lg overflow-hidden">
                <colgroup>
                  <col className="w-1/3" />
                  <col className="w-2/3" />
                </colgroup>
                <tbody className="text-gray-700">
                  {[
                    { label: "Name", value: userData?.username },
                    { label: "Email", value: userData?.email },
                    { label: "Phone", value: userData?.phone },
                    { label: "Address", value: userData?.address },
                    {
                      label: "Date",
                      value: userData?.date
                        ? new Date(userData.date).toLocaleDateString()
                        : "N/A",
                    },
                  ].map((item, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0
                          ? "bg-gray-100 hover:bg-gray-200 transition duration-300"
                          : "hover:bg-gray-100 transition duration-300"
                      }
                    >
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-left">
                        {item.label}:
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-left">
                        {item.value || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Sherwani Measurement
              </h2>
              <table className="w-full table-fixed border-collapse border border-gray-300 rounded-lg overflow-hidden">
                <colgroup>
                  <col className="w-1/2" />
                  <col className="w-1/2" />
                </colgroup>
                <tbody className="text-gray-700">
                  {[
                    {
                      label: "Length",
                      value: userData?.sherwaniLength,
                    },
                    { label: "Chest", value: userData?.sherwaniChest },
                    {
                      label: "Blow Chest",
                      value: userData?.sherwaniBlowChest,
                    },
                    { label: "Waist", value: userData?.sherwaniWaist },
                    { label: "Hip", value: userData?.sherwaniHip },
                    {
                      label: "Sleeve",
                      value: userData?.sherwaniSleeve,
                    },
                    { label: "Neck", value: userData?.sherwaniNeck },
                    {
                      label: "Shoulder",
                      value: userData?.sherwaniShoulder,
                    },
                    { label: "Cap", value: userData?.sherwaniCap },
                    {
                      label: "Full Height",
                      value: userData?.sherwaniFullHeight,
                    },
                  ].map((item, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0
                          ? "bg-gray-100 hover:bg-gray-200 transition duration-300"
                          : "hover:bg-gray-100 transition duration-300"
                      }
                    >
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-left">
                        {item.label}:
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-left">
                        {item.value || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Coat Measurement
              </h2>
              <table className="w-full table-fixed border-collapse border border-gray-300 rounded-lg overflow-hidden">
                <colgroup>
                  <col className="w-1/2" />
                  <col className="w-1/2" />
                </colgroup>
                <tbody className="text-gray-700">
                  {[
                    { label: "Length", value: userData?.coatLength },
                    { label: "Chest", value: userData?.coatChest },
                    {
                      label: "Blow Chest",
                      value: userData?.coatBlowChest,
                    },
                    { label: "Waist", value: userData?.coatWaist },
                    { label: "Hip", value: userData?.coatHip },
                    { label: "Sleeve", value: userData?.coatSleeve },
                    { label: "Neck", value: userData?.coatNeck },
                    { label: "Shoulder", value: userData?.coatShoulder },
                    { label: "Cap", value: userData?.coatCap },
                    {
                      label: "Full Height",
                      value: userData?.coatFullHeight,
                    },
                  ].map((item, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0
                          ? "bg-gray-100 hover:bg-gray-200 transition duration-300"
                          : "hover:bg-gray-100 transition duration-300"
                      }
                    >
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-left">
                        {item.label}:
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-left">
                        {item.value || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Pant Measurement
              </h2>
              <table className="w-full table-fixed border-collapse border border-gray-300 rounded-lg overflow-hidden">
                <colgroup>
                  <col className="w-1/2" />
                  <col className="w-1/2" />
                </colgroup>
                <tbody className="text-gray-700">
                  {[
                    { label: "Length", value: userData?.pantLength },
                    { label: "Waist", value: userData?.pantWaist },
                    { label: "Thigh", value: userData?.pantThigh },
                    { label: "Bottom", value: userData?.pantBottom },
                  ].map((item, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0
                          ? "bg-gray-100 hover:bg-gray-200 transition duration-300"
                          : "hover:bg-gray-100 transition duration-300"
                      }
                    >
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-left">
                        {item.label}:
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-left">
                        {item.value || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-center">
                Troser or Pajama Measurement
              </h2>
              <table className="w-full table-fixed border-collapse border border-gray-300 rounded-lg overflow-hidden">
                <colgroup>
                  <col className="w-1/2" />
                  <col className="w-1/2" />
                </colgroup>
                <tbody className="text-gray-700">
                  {[
                    { label: "Length", value: userData?.trozenLength },
                    { label: "Mohri", value: userData?.trozenMohri },
                  ].map((item, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0
                          ? "bg-gray-100 hover:bg-gray-200 transition duration-300"
                          : "hover:bg-gray-100 transition duration-300"
                      }
                    >
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-left">
                        {item.label}:
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-left">
                        {item.value || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        isOpen={!!selectedPreviewUrl}
        handleOnImageClose={handleOnImageClose}
        imageUrl={selectedPreviewUrl}
      />
    </>
  );
}
