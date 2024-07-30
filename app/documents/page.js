"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";

const Documents = () => {
  const { user } = useUser();
  const [drivingLicenseFiles, setDrivingLicenseFiles] = useState([]);
  const [aadhaarFiles, setAadhaarFiles] = useState([]);
  const [drivingLicensePreviews, setDrivingLicensePreviews] = useState([]);
  const [aadhaarPreviews, setAadhaarPreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const { name } = e.target;

    if (name === "DrivingLicense") {
      if (files.length > 2) {
        alert('You can only upload up to 2 images for Driving License.');
        return;
      }
      setDrivingLicenseFiles(files);
      setDrivingLicensePreviews(files.map(file => URL.createObjectURL(file)));
    } else if (name === "Aadhaar") {
      if (files.length > 2) {
        alert('You can only upload up to 2 images for Aadhaar.');
        return;
      }
      setAadhaarFiles(files);
      setAadhaarPreviews(files.map(file => URL.createObjectURL(file)));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    drivingLicenseFiles.forEach(file => formData.append("DrivingLicense", file));
    aadhaarFiles.forEach(file => formData.append("Aadhaar", file));
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
      } else {
        throw new Error("Failed to upload documents");
      }
    } catch (error) {
      console.error("Error uploading documents:", error);
      alert("Failed to upload documents");
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center m-10 text-2xl font-semibold text-white">
          Please provide your documents
        </div>
        <div className=" bg-white m-20 rounded-md p-10">
          <div className="flex justify-center gap-20">
            <label className="border py-10 px-10">
              <div className="flex flex-col space-y-4">
                <div>Driving License (Front and Back):</div>
                <div className="flex flex-col gap-4">
                  <input
                    type="file"
                    name="DrivingLicense"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                  />
                  {drivingLicensePreviews.length > 0 && (
                    <div className="flex gap-4">
                      {drivingLicensePreviews.map((preview, index) => (
                        <img
                          key={index}
                          src={preview}
                          alt={`Driving License Preview ${index + 1}`}
                          className="w-48 h-auto"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </label>

            <label className="border py-10 px-10">
              <div className="flex flex-col space-y-4">
                <div>Aadhaar (Front and Back):</div>
                <div className="flex flex-col gap-4">
                  <input
                    type="file"
                    name="Aadhaar"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                  />
                  {aadhaarPreviews.length > 0 && (
                    <div className="flex gap-4">
                      {aadhaarPreviews.map((preview, index) => (
                        <img
                          key={index}
                          src={preview}
                          alt={`Aadhaar Preview ${index + 1}`}
                          className="w-48 h-auto border"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </label>
          </div>
          <div className="flex justify-center mt-20 ">
            <button
              type="submit"
              className="bg-rose-950 text-white p-2 rounded-md hover:bg-rose-950/90"
            >
              Upload
            </button>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Documents;
