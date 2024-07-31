"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";
import { useRouter } from "next/router"; // Import useRouter from Next.js

const Documents = () => {
  const { user } = useUser();
  const router = useRouter(); // Initialize the router
  const [drivingLicenseFront, setDrivingLicenseFront] = useState(null);
  const [drivingLicenseBack, setDrivingLicenseBack] = useState(null);
  const [aadhaarFront, setAadhaarFront] = useState(null);
  const [aadhaarBack, setAadhaarBack] = useState(null);

  const [drivingLicenseFrontPreview, setDrivingLicenseFrontPreview] = useState(null);
  const [drivingLicenseBackPreview, setDrivingLicenseBackPreview] = useState(null);
  const [aadhaarFrontPreview, setAadhaarFrontPreview] = useState(null);
  const [aadhaarBackPreview, setAadhaarBackPreview] = useState(null);

  const [isLoading, setIsLoading] = useState(false); // State for loading

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const { name } = e.target;

    const maxSize = 1 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("File size should not exceed 1MB");
      return; 
    }

    if (name === "DrivingLicenseFront") {
      setDrivingLicenseFront(file);
      setDrivingLicenseFrontPreview(URL.createObjectURL(file));
    } else if (name === "DrivingLicenseBack") {
      setDrivingLicenseBack(file);
      setDrivingLicenseBackPreview(URL.createObjectURL(file));
    } else if (name === "AadhaarFront") {
      setAadhaarFront(file);
      setAadhaarFrontPreview(URL.createObjectURL(file));
    } else if (name === "AadhaarBack") {
      setAadhaarBack(file);
      setAadhaarBackPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("DrivingLicenseFront", drivingLicenseFront);
    formData.append("DrivingLicenseBack", drivingLicenseBack);
    formData.append("AadhaarFront", aadhaarFront);
    formData.append("AadhaarBack", aadhaarBack);
    formData.append("userId", user.id);
    formData.append("name", user.fullName);
    formData.append("phoneNumber", user.primaryPhoneNumber.phoneNumber);

    try {
      const response = await axios.post(
        "https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/documents/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Documents uploaded successfully");
        router.push("/SearchCars");
      } else {
        throw new Error("Failed to upload documents");
      }
    } catch (error) {
      console.error("Error uploading documents:", error);
      alert("Failed to upload documents");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center m-10 text-2xl font-semibold text-white">
          Please provide your documents
        </div>
        <div className="bg-white m-20 rounded-md p-10">
          <div className="flex justify-center gap-20">
            <label className="border py-10 px-10">
              <div className="flex flex-col space-y-4">
                <div>Driving License (Front):</div>
                <div className="flex justify-center">
                  <input
                    type="file"
                    name="DrivingLicenseFront"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              {drivingLicenseFrontPreview && (
                <div className="m-10">
                  <div>Driving License Front Preview:</div>
                  <img
                    src={drivingLicenseFrontPreview}
                    alt="Driving License Front Preview"
                    className="w-48 h-auto"
                  />
                </div>
              )}
            </label>

            <label className="border py-10 px-10">
              <div className="flex flex-col space-y-4">
                <div>Driving License (Back):</div>
                <div className="flex justify-center">
                  <input
                    type="file"
                    name="DrivingLicenseBack"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              {drivingLicenseBackPreview && (
                <div className="m-10">
                  <div>Driving License Back Preview:</div>
                  <img
                    src={drivingLicenseBackPreview}
                    alt="Driving License Back Preview"
                    className="w-48 h-auto"
                  />
                </div>
              )}
            </label>
            </div>
            <div className="flex justify-center gap-20">

            <label className="border py-10 px-10">
              <div className="flex flex-col space-y-4">
                <div>Aadhaar (Front):</div>
                <div className="flex justify-center">
                  <input
                    type="file"
                    name="AadhaarFront"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              {aadhaarFrontPreview && (
                <div className="m-10">
                  <div>Aadhaar Front Preview:</div>
                  <img
                    src={aadhaarFrontPreview}
                    alt="Aadhaar Front Preview"
                    className="w-48 h-auto border"
                  />
                </div>
              )}
            </label>

            <label className="border py-10 px-10">
              <div className="flex flex-col space-y-4">
                <div>Aadhaar (Back):</div>
                <div className="flex justify-center">
                  <input
                    type="file"
                    name="AadhaarBack"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              {aadhaarBackPreview && (
                <div className="m-10">
                  <div>Aadhaar Back Preview:</div>
                  <img
                    src={aadhaarBackPreview}
                    alt="Aadhaar Back Preview"
                    className="w-48 h-auto border"
                  />
                </div>
              )}
            </label>
          </div>
          <div className="flex justify-center mt-20 ">
            <button
              type="submit"
              className="bg-rose-950 text-white p-2 rounded-md hover:bg-rose-950/90"
              disabled={isLoading} 
            >
              {isLoading ? "Uploading..." : "Upload"} 
            </button>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Documents;
