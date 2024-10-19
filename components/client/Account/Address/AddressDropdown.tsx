"use client";
import React, { useEffect, useState } from "react";

interface AddressDropdownProps {
  Region: {
    city: string;
    district: string;
    ward: string;
  };
  SelectRegion: (region: any) => void;
}

function AddressDropdown({ SelectRegion, Region }: AddressDropdownProps) {
  const [cities, setCities] = useState<any>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCityChange = (event: any) => {
    const selectedCityId = event.target.value;
    const selectedCityName =
      event.target.options[event.target.selectedIndex].text;
    SelectRegion({ ...Region, city: selectedCityName });
    setSelectedCity(selectedCityId);
    setSelectedDistrict("");

    if (selectedCityId) {
      const selectedCityData: any = cities.find(
        (city: any) => city.Id === selectedCityId
      );
      setDistricts(selectedCityData.Districts);
    } else {
      setDistricts([]);
      setWards([]);
    }
  };

  const handleDistrictChange = (event: any) => {
    const selectedDistrictId = event.target.value;
    const selectedDistrictName =
      event.target.options[event.target.selectedIndex].text;
    SelectRegion({ ...Region, district: selectedDistrictName });

    setSelectedDistrict(selectedDistrictId);

    if (selectedDistrictId) {
      const selectedCityData: any = cities.find(
        (city: any) => city.Id === selectedCity
      );
      const selectedDistrictData: any = selectedCityData.Districts.find(
        (district: any) => district.Id === selectedDistrictId
      );
      setWards(selectedDistrictData.Wards);
    } else {
      setWards([]);
    }
  };
  const handleWardChange = (event: any) => {
    const selectedWardName =
      event.target.options[event.target.selectedIndex].text;
    SelectRegion({ ...Region, ward: selectedWardName });
  };
  return (
    <>
      <div className="flex flex-col">
        <label>Tỉnh thành</label>
        <select
          className="p-2 w-full border mt-1 border-mainorange outline-none bg-white rounded-md border-slate-300 focus:border-blue-500"
          value={selectedCity}
          onChange={handleCityChange}
        >
          <option value="" className="">
            Chọn tỉnh / thành
          </option>
          {cities.map((city: any, idx: number) => (
            <option key={idx} value={city.Id}>
              {city.Name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label>Quận huyện</label>
        <select
          className="w-full p-2 border mt-1 border-mainorange outline-none bg-white rounded-md border-slate-300 focus:border-blue-500"
          value={selectedDistrict}
          onChange={handleDistrictChange}
        >
          <option value="">Chọn quận / huyện</option>
          {districts.map((district: any, idx: number) => (
            <option key={idx} value={district.Id}>
              {district.Name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label>Phường xã</label>
        <select
          className="w-full p-2 border mt-1 border-mainorange outline-none bg-white rounded-md border-slate-300 focus:border-blue-500"
          onChange={handleWardChange}
        >
          <option value="">Chọn phường / xã</option>
          {wards.map((ward: any, idx: number) => (
            <option key={idx} value={ward.Id}>
              {ward.Name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default AddressDropdown;
