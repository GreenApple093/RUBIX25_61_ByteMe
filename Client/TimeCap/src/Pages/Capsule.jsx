import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import CreateCapsuleForm from "../components/CreateCapsuleForm";
import axios from "axios";

const Capsule = () => {
    const [capsules, setCapsules] = useState([]);  // Initialize as empty array
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCapsules = async () => {
            try {
                const response = await axios.get("http://localhost:3300/User/allcapsule", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setCapsules(response.data.timeCapsules || []); // Ensure it's always an array
            } catch (error) {
                console.error("Error fetching capsules:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCapsules();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div
            style={{
                backgroundImage: "url('./images/bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            className="relative min-h-screen"
        >
            <Navbar />
            <div className="relative flex flex-col items-center justify-center h-screen z-10 mt-16">
                <div className="flex gap-10 w-[80%] bg-opacity-90 p-5 rounded-lg items-center">
                    <div className="flex flex-col gap-5 p-5 rounded-lg shadow-md justify-center h-[620px] w-1/2">
                        <p className="text-5xl font-semibold text-left leading-relaxed">
                            Upcoming
                            <br />
                            Unveil
                        </p>
                        <p className="text-3xl font-medium text-right leading-relaxed">
                            29th January, 2025
                            <br />
                            <span className="text-2xl">11:00am</span>
                        </p>
                    </div>
                    <div className="flex flex-col gap-5 p-5 py-10 rounded-lg shadow-md w-1/2">
                        <CreateCapsuleForm />
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <BentoGrid className="max-w-4xl mx-auto">
                    {capsules.length > 0 ? (
                        capsules.map((capsule, i) => (
                            <BentoGridItem
                                key={capsule._id}
                                title={capsule.thoughts}
                                description={`To be unveiled on ${new Date(capsule.unveilDate).toLocaleDateString()}`}
                                img={capsule.media[0] || "/images/placeholder.jpg"} // Use placeholder if no media
                                className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                            />
                        ))
                    ) : (
                        <p>No capsules found</p>
                    )}
                </BentoGrid>
            </div>
        </div>
    );
};

export default Capsule;
