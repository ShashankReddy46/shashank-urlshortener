import React, { useEffect, useState } from "react";
import Service from "../utils/http";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await Service.get('https://shashank-urlshortener.onrender.com/api/profile');
                setProfile(response.data);
            } catch (err) {
                setError("Failed to load profile.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</div>;
    if (error) return <div style={{ textAlign: "center", marginTop: "2rem" }}>{error}</div>;

    // Fallbacks for missing data
    const image = profile?.image || "https://via.placeholder.com/120";
    const email = profile?.email || "Not available";
    const userid = profile?.userid || profile?.id || "Not available";
    const createdAt = profile?.createdAt
        ? new Date(profile.createdAt).toLocaleDateString()
        : "Not available";

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
            <div style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "2rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                textAlign: "center",
                background: "#fff",
                minWidth: "320px"
            }}>
                <h2>Profile</h2>
                <img
                    src={image}
                    alt="Profile"
                    style={{ width: 120, height: 120, borderRadius: "50%", marginBottom: "1rem", objectFit: "cover" }}
                />
                <p><strong>Email:</strong> {email}</p>
                <p><strong>User ID:</strong> {userid}</p>
                <p><strong>Account Created:</strong> {createdAt}</p>
            </div>
        </div>
    );
};

export default Profile;
