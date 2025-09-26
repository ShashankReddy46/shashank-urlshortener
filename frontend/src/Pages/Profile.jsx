import { useEffect, useState} from "react";
import Service from "../utils/http";
import { Title } from "@mantine/core";

const Profile = () => {

    const [data, setData] = useState(null);

    const service = new Service();

    const getData = async () => {
        const response = await service.get('user/me');
        console.log(response);
        setData(response.data);
    }

    useEffect(() => {
        getData();
    }, []);

  return (
    <div
      style={{
        fontWeight: "normal",
        fontSize: "1.3rem", // Reduced text size
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
        background: "#fff",
        borderRadius: "16px",
        width: "600px", // Reduced width
        margin: "40px auto" // Center the box horizontally
      }}
    >
      <img
        src="/endgame.jpg"
        alt="Profile"
        style={{ width: "180px", height: "180px", borderRadius: "50%", marginBottom: "1.5rem" }}
      />
      Name: {data?.name}
      <br />
      Email: {data?.email}
      <br />
      Account Created: {data?.createdAt}
    </div>
  )
}

export default Profile;