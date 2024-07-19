import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';

const Documents = () => {
  const { user } = useUser();
  const [drivingLicense, setDrivingLicense] = useState(null);
  const [aadhaar, setAadhaar] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.name === 'DrivingLicense') {
      setDrivingLicense(e.target.files[0]);
    } else if (e.target.name === 'Aadhaar') {
      setAadhaar(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('DrivingLicense', drivingLicense);
    formData.append('Aadhaar', aadhaar);
    formData.append('userId', user.id);
    formData.append('name', user.fullName);
    formData.append('email', user.primaryEmailAddress.emailAddress);
    formData.append('phoneNumber', user.primaryPhoneNumber.phoneNumber);

    try {
      const response = await fetch('https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/documents/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload documents');
      }

      alert('Documents uploaded successfully');
    } catch (error) {
      console.error('Error uploading documents:', error);
      alert('Failed to upload documents');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Driving License:
        <input type="file" name="DrivingLicense" onChange={handleFileChange} />
      </label>
      <label>
        Aadhaar:
        <input type="file" name="Aadhaar" onChange={handleFileChange} />
      </label>
      <button type="submit">Upload</button>
    </form>
  );
};

export default Documents;
