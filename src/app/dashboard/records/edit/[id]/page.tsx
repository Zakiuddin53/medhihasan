"use client";
import Navbar from "@/app/dashboard/Navbar";
import { useState, useEffect, SetStateAction } from "react";
import { Button, LoadingOverlay, NumberInput, TextInput } from "@mantine/core";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EditPage({ params }: any) {
  const navigate = useRouter();
  const [visible, setVisible] = useState(false);
  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState(null);

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      address: "",
      sherwaniLength: "",
      sherwaniChest: "",
      sherwaniBlowChest: "",
      sherwaniWaist: "",
      sherwaniHip: "",
      sherwaniSleeve: "",
      sherwaniNeck: "",
      sherwaniShoulder: "",
      sherwaniCap: null,
      sherwaniFullHeight: "",
      trozenLength: "",
      trozenMohri: "",
      coatLength: "",
      coatChest: "",
      coatBlowChest: "",
      coatWaist: "",
      coatHip: "",
      coatSleeve: "",
      coatNeck: "",
      coatShoulder: "",
      coatCap: "",
      coatFullHeight: "",
      pantLength: "",
      pantWaist: "",
      pantThigh: "",
      pantBottom: "",
    },

    transformValues(values) {
      values.phone = String(values.phone);
      return values;
    },
  });

  useEffect(() => {
    console.log("edit call");
    async function fetchUserData() {
      try {
        setVisible(true);
        const res = await axios.get(`/api/users/${params.id}`);
        if (res.status !== 200) {
          throw new Error("Network response was not ok");
        }
        const data = res.data;
        form.setValues(data);
      } catch (err) {
      } finally {
        setVisible(false);
      }
    }

    fetchUserData();
  }, [params.id]);

  const handleSubmit = async (values) => {
    const payload = structuredClone(values);

    delete payload.image1;
    delete payload.image2;
    delete payload.image3;

    try {
      const response = await axios.put(`/api/users/${params.id}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const url = "/dashboard/records";
        navigate.push(url);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  const handleOnImageOpen = (imageUrl: SetStateAction<null>) => {
    setSelectedPreviewUrl(imageUrl);
  };

  const handleOnImageClose = () => {
    setSelectedPreviewUrl(null);
  };

  return (
    <>
      <Navbar />
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "blue", type: "bars" }}
      />

      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-xxl mx-auto px-4 lg:px-8 py-12 text-black">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div
              style={{
                fontSize: "40px",
                fontWeight: "500",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {form.values?.username}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {[
                form.values?.image1,
                form.values?.image2,
                form.values?.image3,
              ].map((src, index) => (
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
              ))}
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center mt-4">
              Personal Info
            </h2>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 mt-8">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <TextInput
                    placeholder="Enter username"
                    {...form?.getInputProps("username")}
                    size="md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <TextInput
                    placeholder="Enter email"
                    {...form?.getInputProps("email")}
                    size="md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <NumberInput
                    placeholder="Enter phone"
                    {...form?.getInputProps("phone")}
                    size="md"
                    hideControls
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <TextInput
                    placeholder="Enter address"
                    value={form.values.address}
                    {...form?.getInputProps("address")}
                    size="md"
                  />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-center mt-7">
                Sherwani Measurement
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 mt-8">
                <div>
                  <label
                    htmlFor="sherwaniLength"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Length
                  </label>
                  <NumberInput
                    placeholder="Enter Sherwani Length"
                    value={form.values.sherwaniLength}
                    {...form.getInputProps("sherwaniLength")}
                    size="md"
                    hideControls
                  />
                </div>
                <div>
                  <label
                    htmlFor="sherwaniChest"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Chest
                  </label>
                  <NumberInput
                    placeholder="Enter Sherwani Chest"
                    value={form.values.sherwaniChest}
                    {...form.getInputProps("sherwaniChest")}
                    size="md"
                    hideControls
                  />
                </div>
                <div>
                  <label
                    htmlFor="sherwaniBlowChest"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Blow Chest
                  </label>
                  <NumberInput
                    placeholder="Enter Sherwani Blow Chest"
                    value={form.values.sherwaniBlowChest}
                    {...form.getInputProps("sherwaniBlowChest")}
                    size="md"
                    hideControls
                  />
                </div>
                <div>
                  <label
                    htmlFor="sherwaniWaist"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Waist
                  </label>
                  <NumberInput
                    placeholder="Enter Sherwani Waist"
                    value={form.values.sherwaniWaist}
                    {...form.getInputProps("sherwaniWaist")}
                    size="md"
                    hideControls
                  />
                </div>
                <div>
                  <label
                    htmlFor="sherwaniHip"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Hip
                  </label>
                  <NumberInput
                    placeholder="Enter Sherwani Hip"
                    value={form.values.sherwaniHip}
                    {...form.getInputProps("sherwaniHip")}
                    size="md"
                    hideControls
                  />
                </div>
                <div>
                  <label
                    htmlFor="sherwaniSleeve"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sleeve
                  </label>
                  <NumberInput
                    placeholder="Enter Sherwani Sleeve"
                    value={form.values.sherwaniSleeve}
                    {...form.getInputProps("sherwaniSleeve")}
                    size="md"
                    hideControls
                  />
                </div>
                <div>
                  <label
                    htmlFor="sherwaniNeck"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Neck
                  </label>
                  <NumberInput
                    placeholder="Enter Sherwani Neck"
                    value={form.values.sherwaniNeck}
                    {...form.getInputProps("sherwaniNeck")}
                    size="md"
                    hideControls
                  />
                </div>
                <div>
                  <label
                    htmlFor="sherwaniShoulder"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Shoulder
                  </label>
                  <NumberInput
                    placeholder="Enter Sherwani Shoulder"
                    value={form.values.sherwaniShoulder}
                    {...form.getInputProps("sherwaniShoulder")}
                    size="md"
                    hideControls
                  />
                </div>
                <div>
                  <label
                    htmlFor="sherwaniCap"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cap
                  </label>
                  <NumberInput
                    placeholder="Enter Sherwani Cap"
                    value={form.values.sherwaniCap}
                    {...form.getInputProps("sherwaniCap")}
                    size="md"
                    hideControls
                  />
                </div>
                <div>
                  <label
                    htmlFor="sherwaniFullHeight"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Height
                  </label>
                  <NumberInput
                    placeholder="Enter Sherwani Full Height"
                    value={form.values.sherwaniFullHeight}
                    {...form.getInputProps("sherwaniFullHeight")}
                    size="md"
                    hideControls
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-center mt-7">
                Trouser or Pajama Measurement
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 mt-8">
                <div>
                  <label
                    htmlFor="trozenLength"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Length
                  </label>
                  <NumberInput
                    placeholder="Enter Trozen Length"
                    value={form.values.trozenLength}
                    {...form.getInputProps("trozenLength")}
                    size="md"
                    hideControls
                  />
                </div>
                <div>
                  <label
                    htmlFor="trozenMohri"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Length Mohri
                  </label>
                  <NumberInput
                    placeholder="Enter Trozen Mohri"
                    value={form.values.trozenMohri}
                    {...form.getInputProps("trozenMohri")}
                    size="md"
                    hideControls
                  />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-center mt-7">
                Coat Measurement
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 mt-8">
                <div>
                  <label
                    htmlFor="coatLength"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Length
                  </label>
                  <NumberInput
                    placeholder="Enter Coat Length"
                    value={form.values.coatLength}
                    {...form.getInputProps("coatLength")}
                    size="md"
                    hideControls
                  />
                </div>
                <div>
                  <label
                    htmlFor="coatChest"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Chest
                  </label>
                  <NumberInput
                    placeholder="Enter Coat Chest"
                    value={form.values.coatChest}
                    {...form.getInputProps("coatChest")}
                    size="md"
                    hideControls
                  />
                </div>
                <div>
                  <label
                    htmlFor="coatBlowChest"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Blow Chest
                  </label>
                  <NumberInput
                    placeholder="Enter Coat Blow Chest"
                    value={form.values.coatBlowChest}
                    {...form.getInputProps("coatBlowChest")}
                    size="md"
                    hideControls
                  />
                </div>
                <div>
                  <label
                    htmlFor="coatWaist"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Waist
                  </label>
                  <NumberInput
                    placeholder="Enter Coat Waist"
                    value={form.values.coatWaist}
                    {...form.getInputProps("coatWaist")}
                    size="md"
                    hideControls
                  />
                </div>
                <div>
                  <label
                    htmlFor="coatHip"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Hip
                  </label>
                  <NumberInput
                    placeholder="Enter Coat Hip"
                    value={form.values.coatHip}
                    {...form.getInputProps("coatHip")}
                    size="md"
                    hideControls
                  />
                </div>
                <div>
                  <label
                    htmlFor="coatSleeve"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sleeve
                  </label>
                  <NumberInput
                    placeholder="Enter Coat Sleeve"
                    value={form.values.coatSleeve}
                    {...form.getInputProps("coatSleeve")}
                    size="md"
                    hideControls
                  />
                </div>
                <div>
                  <label
                    htmlFor="coatNeck"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Neck
                  </label>
                  <NumberInput
                    placeholder="Enter Coat Neck"
                    value={form.values.coatNeck}
                    {...form.getInputProps("coatNeck")}
                    size="md"
                    hideControls
                  />
                </div>
                <div>
                  <label
                    htmlFor="coatShoulder"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Shoulder
                  </label>
                  <NumberInput
                    placeholder="Enter Coat Shoulder"
                    value={form.values.coatShoulder}
                    {...form.getInputProps("coatShoulder")}
                    size="md"
                    hideControls
                  />
                </div>
                <div>
                  <label
                    htmlFor="coatCap"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cap
                  </label>
                  <NumberInput
                    placeholder="Enter Coat Cap"
                    value={form.values.coatCap}
                    {...form.getInputProps("coatCap")}
                    size="md"
                    hideControls
                  />
                </div>
                <div>
                  <label
                    htmlFor="coatFullHeight"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Height
                  </label>
                  <NumberInput
                    placeholder="Enter Coat Full Height"
                    value={form.values.coatFullHeight}
                    {...form.getInputProps("coatFullHeight")}
                    size="md"
                    hideControls
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-center mt-7">
                Pant Measurement
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 mt-8">
                <div>
                  <label
                    htmlFor="pantLength"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Length
                  </label>
                  <NumberInput
                    placeholder="Enter Pant Length"
                    value={form.values.pantLength}
                    {...form.getInputProps("pantLength")}
                    size="md"
                    hideControls
                  />
                </div>
                <div>
                  <label
                    htmlFor="pantWaist"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Waist
                  </label>
                  <NumberInput
                    placeholder="Enter Pant Waist"
                    value={form.values.pantWaist}
                    {...form.getInputProps("pantWaist")}
                    size="md"
                    hideControls
                  />
                </div>
                <div>
                  <label
                    htmlFor="pantThigh"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Thigh
                  </label>
                  <NumberInput
                    placeholder="Enter Pant Thigh"
                    value={form.values.pantThigh}
                    {...form.getInputProps("pantThigh")}
                    size="md"
                    hideControls
                  />
                </div>
                <div>
                  <label
                    htmlFor="pantBottom"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bottom
                  </label>
                  <NumberInput
                    placeholder="Enter Pant Bottom"
                    value={form.values.pantBottom}
                    {...form.getInputProps("pantBottom")}
                    size="md"
                    hideControls
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-center mt-10">
                  {/* <Button variant="filled" px={80} size="md" type="submit">
                    SAVE
                  </Button> */}
                  <Button
                    type="submit"
                    color="teal"
                    size="lg"
                    className="w-full md:w-auto"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
