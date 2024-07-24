"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Header from "../Header";
import Footer from "../Footer";

const Documents = () => {
  const { user } = useUser();
  const [drivingLicense, setDrivingLicense] = useState(null);
  const [aadhaar, setAadhaar] = useState(null);
  const [drivingLicensePreview, setDrivingLicensePreview] = useState(null);
  const [aadhaarPreview, setAadhaarPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const { name } = e.target;

    if (name === "DrivingLicense") {
      setDrivingLicense(file);
      setDrivingLicensePreview(URL.createObjectURL(file));
    } else if (name === "Aadhaar") {
      setAadhaar(file);
      setAadhaarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("DrivingLicense", drivingLicense);
    formData.append("Aadhaar", aadhaar);
    formData.append("userId", user.id);
    formData.append("name", user.fullName);
    formData.append("phoneNumber", user.primaryPhoneNumber.phoneNumber);

    try {
      const response = await fetch(
        "https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/documents/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      console.log(response)

      if (!response.ok) {
        throw new Error("Failed to upload documents");
      }

      alert("Documents uploaded successfully");
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
                 <div className=""> Driving License:</div>
                 <div className="flex justify-center">
              <input
                type="file"
                name="DrivingLicense"
                onChange={handleFileChange}
              />
              </div>
              </div>
               {drivingLicensePreview && (
              <div className="m-10 ">
                <div className="">Driving License Preview:</div>
                <img src={drivingLicensePreview} alt="Driving License Preview" className="w-48 h-auto" />
              </div>
            )}
            </label>



            <label className="border py-10 px-10">
            <div className="flex flex-col space-y-4">
              <div>Aadhaar:</div>
              <div className="flex justify-center">
              <input type="file" name="Aadhaar" onChange={handleFileChange} />
              </div>
              </div>
              {aadhaarPreview && (
              <div className="m-10">
                <div className="">Aadhaar Preview:</div>
                <img src={aadhaarPreview} alt="Aadhaar Preview" className="w-48 h-auto border" />
              </div>
            )}
            </label>
          </div>
          <div className="flex justify-center mt-20 ">
            <button type="submit" className="bg-rose-950 text-white p-2 rounded-md hover:bg-rose-950/90">Upload</button>
          </div>
        </div>
      </form>

      <Footer />
    </div>
  );
};

export default Documents;
