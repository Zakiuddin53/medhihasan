"use client";
import { useState } from "react";
import {
  Button,
  TextInput,
  Code,
  LoadingOverlay,
  NumberInput,
} from "@mantine/core";
import axios from "axios";
import { Form, useForm } from "@mantine/form";
import { notifications, showNotification } from "@mantine/notifications";
import { Check } from "tabler-icons-react";
import CloudinaryUploader from "../components/cloudinaryUploaderimage";
import { DateInput } from "@mantine/dates";
import { useRouter } from "next/navigation";

function Demo() {
  const [imageUrls, setimageUrls] = useState([]);
  const navigate = useRouter();

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      image: "",
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
      sherwaniCap: "",
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
  });

  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<Date | null>(null);
  const handleSubmit = async () => {
    try {
      const convertedValues = {
        ...form.values,
        phone: form.values.phone.toString(),
        sherwaniLength: form.values.sherwaniLength
          ? parseFloat(form.values.sherwaniLength)
          : null,
        sherwaniChest: form.values.sherwaniChest
          ? parseFloat(form.values.sherwaniChest)
          : null,
        sherwaniBlowChest: form.values.sherwaniBlowChest
          ? parseFloat(form.values.sherwaniBlowChest)
          : null,
        sherwaniWaist: form.values.sherwaniWaist
          ? parseFloat(form.values.sherwaniWaist)
          : null,
        sherwaniHip: form.values.sherwaniHip
          ? parseFloat(form.values.sherwaniHip)
          : null,
        sherwaniSleeve: form.values.sherwaniSleeve
          ? parseFloat(form.values.sherwaniSleeve)
          : null,
        sherwaniNeck: form.values.sherwaniNeck
          ? parseFloat(form.values.sherwaniNeck)
          : null,
        sherwaniShoulder: form.values.sherwaniShoulder
          ? parseFloat(form.values.sherwaniShoulder)
          : null,
        sherwaniCap: form.values.sherwaniCap
          ? parseFloat(form.values.sherwaniCap)
          : null,
        sherwaniFullHeight: form.values.sherwaniFullHeight
          ? parseFloat(form.values.sherwaniFullHeight)
          : null,

        trozenLength: form.values.trozenLength
          ? parseFloat(form.values.trozenLength)
          : null,
        trozenMohri: form.values.trozenMohri
          ? parseFloat(form.values.trozenMohri)
          : null,

        coatLength: form.values.coatLength
          ? parseFloat(form.values.coatLength)
          : null,
        coatChest: form.values.coatChest
          ? parseFloat(form.values.coatChest)
          : null,

        coatBlowChest: form.values.coatBlowChest
          ? parseFloat(form.values.coatBlowChest)
          : null,

        coatWaist: form.values.coatWaist
          ? parseFloat(form.values.coatWaist)
          : null,

        coatHip: form.values.coatHip ? parseFloat(form.values.coatHip) : null,
        coatSleeve: form.values.coatSleeve
          ? parseFloat(form.values.coatSleeve)
          : null,

        coatNeck: form.values.coatNeck
          ? parseFloat(form.values.coatNeck)
          : null,

        coatShoulder: form.values.coatShoulder
          ? parseFloat(form.values.coatShoulder)
          : null,

        coatCap: form.values.coatCap ? parseFloat(form.values.coatCap) : null,
        coatFullHeight: form.values.coatFullHeight
          ? parseFloat(form.values.coatFullHeight)
          : null,

        pantLength: form.values.pantLength
          ? parseFloat(form.values.pantLength)
          : null,

        pantWaist: form.values.pantWaist
          ? parseFloat(form.values.pantWaist)
          : null,

        pantThigh: form.values.pantThigh
          ? parseFloat(form.values.pantThigh)
          : null,

        pantBottom: form.values.pantBottom
          ? parseFloat(form.values.pantBottom)
          : null,

        image1: imageUrls[0],
        image2: imageUrls[1],
        image3: imageUrls[2],
      };

      setVisible(true);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post("/api/users", convertedValues, config);

      showNotification({
        title: "Success",
        message: "Form submitted successfully!",
        color: "teal",
        icon: <Check />,
      });

      form.reset();
      setimageUrls([]);
      const url = "/dashboard/records";
      navigate.push(url);
    } catch (error) {
      showNotification({
        title: "Error",
        message: "An error occurred while submitting the form.",
        color: "red",
        icon: <Check />,
      });
    } finally {
      setVisible(false);
    }
  };

  return (
    <>
      <Form form={form} onSubmit={handleSubmit}>
        <div className="bg-gray-100 min-h-screen">
          <div className="max-w-xxl mx-auto px-4 lg:px-8 py-12 text-black">
            <div className="bg-white shadow-lg rounded-lg p-8">
              <div className="mt-10 flex justify-center">
                <h3 className="text-xl font-semibold mb-4">Upload Images</h3>
              </div>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "15px",
                  color: "grey",
                }}
              >
                3 Images can be Uploaed
              </p>

              <div className="flex justify-center">
                <CloudinaryUploader
                  imageUrls={imageUrls}
                  setImageUrls={setimageUrls}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    marginTop: "10px",
                    textAlign: "center",
                    fontSize: "30px",
                    fontWeight: "500",
                  }}
                >
                  Personal Information
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="space-y-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-semibold"
                  >
                    Name *
                  </label>
                  <TextInput
                    type="text"
                    placeholder="Enter your name"
                    size="md"
                    {...form.getInputProps("username")}
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-semibold"
                  >
                    Email *
                  </label>
                  <TextInput
                    // type="email"
                    placeholder="Enter your email"
                    size="md"
                    {...form.getInputProps("email")}
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 font-semibold"
                  >
                    Phone *
                  </label>
                  <NumberInput
                    placeholder="Enter your phone"
                    size="md"
                    {...form.getInputProps("phone")}
                    hideControls
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="address"
                    className="block text-gray-700 font-semibold"
                  >
                    Address *
                  </label>
                  <TextInput
                    placeholder="Enter your address"
                    size="md"
                    {...form.getInputProps("address")}
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="Date"
                    className="block text-gray-700 font-semibold"
                  >
                    Date *
                  </label>
                  <DateInput
                    size="md"
                    value={value}
                    mt={16}
                    placeholder="Date input"
                    {...form.getInputProps("date")}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    marginTop: "60px",
                    textAlign: "center",
                    fontSize: "30px",
                    fontWeight: "500",
                  }}
                >
                  Sherwani Measurement
                </div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "15px",
                  color: "grey",
                }}
              >
                All Measurements are in Inches
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="space-y-4">
                  <label
                    htmlFor="sherwaniLength"
                    className="block text-gray-700 font-semibold"
                  >
                    Length *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("sherwaniLength")}
                    hideControls
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="sherwaniBlowChest"
                    className="block text-gray-700 font-semibold"
                  >
                    Chest *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("sherwaniChest")}
                    hideControls
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="sherwaniBlowChest"
                    className="block text-gray-700 font-semibold"
                  >
                    Blow Chest *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("sherwaniBlowChest")}
                    hideControls
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="sherwaniWaist"
                    className="block text-gray-700 font-semibold"
                  >
                    Waist *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("sherwaniWaist")}
                    hideControls
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="sherwaniHip"
                    className="block text-gray-700 font-semibold"
                  >
                    Hip *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("sherwaniHip")}
                    hideControls
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="sherwaniSleeve"
                    className="block text-gray-700 font-semibold"
                  >
                    Sherwani Sleeve *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("sherwaniSleeve")}
                    hideControls
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="sherwaniNeck"
                    className="block text-gray-700 font-semibold"
                  >
                    Neck *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("sherwaniNeck")}
                    hideControls
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="sherwaniShoulder"
                    className="block text-gray-700 font-semibold"
                  >
                    Shoulder *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("sherwaniShoulder")}
                    hideControls
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="sherwaniCap"
                    className="block text-gray-700 font-semibold"
                  >
                    Cap *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("sherwaniCap")}
                    hideControls
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="sherwaniFullHeight"
                    className="block text-gray-700 font-semibold"
                  >
                    Full Height *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("sherwaniFullHeight")}
                    hideControls
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    marginTop: "60px",
                    textAlign: "center",
                    fontSize: "30px",
                    fontWeight: "500",
                  }}
                >
                  Trouser Measurement
                </div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "15px",
                  color: "grey",
                }}
              >
                All Measurements are in Inches
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="space-y-4">
                  <label
                    htmlFor="trozenLength"
                    className="block text-gray-700 font-semibold"
                  >
                    Length *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("trozenLength")}
                    hideControls
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="trozenMohri"
                    className="block text-gray-700 font-semibold"
                  >
                    Mohri *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("trozenMohri")}
                    hideControls
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    marginTop: "60px",
                    textAlign: "center",
                    fontSize: "30px",
                    fontWeight: "500",
                  }}
                >
                  Coat Measurement
                </div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "15px",
                  color: "grey",
                }}
              >
                All Measurements are in Inches
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="space-y-4">
                  <label
                    htmlFor="coatLength"
                    className="block text-gray-700 font-semibold"
                  >
                    Length *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("coatLength")}
                    hideControls
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="coatChest"
                    className="block text-gray-700 font-semibold"
                  >
                    Chest *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("coatChest")}
                    hideControls
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="coatBlowChest"
                    className="block text-gray-700 font-semibold"
                  >
                    Blow Chest *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("coatBlowChest")}
                    hideControls
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="coatWaist"
                    className="block text-gray-700 font-semibold"
                  >
                    Waist *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("coatWaist")}
                    hideControls
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="coatHip"
                    className="block text-gray-700 font-semibold"
                  >
                    Hip *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("coatHip")}
                    hideControls
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="coatSleeve"
                    className="block text-gray-700 font-semibold"
                  >
                    Sleeve *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("coatSleeve")}
                    hideControls
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="coatNeck"
                    className="block text-gray-700 font-semibold"
                  >
                    Neck *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("coatNeck")}
                    hideControls
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="coatShoulder"
                    className="block text-gray-700 font-semibold"
                  >
                    Shoulder *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("coatShoulder")}
                    hideControls
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="aroundAnkle"
                    className="block text-gray-700 font-semibold"
                  >
                    Around Ankle *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("aroundAnkle")}
                    hideControls
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="coatFullHeight"
                    className="block text-gray-700 font-semibold"
                  >
                    Full Height *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("coatFullHeight")}
                    hideControls
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    marginTop: "60px",
                    textAlign: "center",
                    fontSize: "30px",
                    fontWeight: "500",
                  }}
                >
                  Pant Measurement
                </div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "15px",
                  color: "grey",
                }}
              >
                All Measurements are in Inches
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="space-y-4">
                  <label
                    htmlFor="pantLength"
                    className="block text-gray-700 font-semibold"
                  >
                    Length *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("pantLength")}
                    hideControls
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="pantWaist"
                    className="block text-gray-700 font-semibold"
                  >
                    Waist *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("pantWaist")}
                    hideControls
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="pantThigh"
                    className="block text-gray-700 font-semibold"
                  >
                    Thigh *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("pantThigh")}
                    hideControls
                  />
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="pantBottom"
                    className="block text-gray-700 font-semibold"
                  >
                    Bottom *
                  </label>
                  <NumberInput
                    type="text"
                    placeholder="Enter measurement"
                    size="md"
                    {...form.getInputProps("pantBottom")}
                    hideControls
                  />
                </div>
              </div>
              <div className="flex justify-center mt-8">
                {/* <Button
                  type="submit"
                  color="teal"
                  size="lg"
                  className="w-full md:w-auto"
                >
                  Submit
                </Button> */}
                {/* <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Submit
                </button> */}
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 font-semibold"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </Form>
      <LoadingOverlay visible={visible} />
    </>
  );
}

export default Demo;
