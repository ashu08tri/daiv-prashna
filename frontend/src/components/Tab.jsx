import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ModalForCards from "./ModalForCards";
import "react-tabs/style/react-tabs.css";
import { jwtDecode } from "jwt-decode";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const TabsComponent = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [modal, setModal] = useState(false);
    const [role, setRole] = useState(null);
    const [token, setToken] = useState(null);
    const [testimonials, setTestimonials] = useState([]);
    const [media, setMedia] = useState([]);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(1);
    const [formData, setFormData] = useState({ title: "", description: "", author: "", image: "", review: "", rating: "" });
    const [editingId, setEditingId] = useState(null);
    const [imageType, setImageType] = useState("url");
    const [file, setFile] = useState(null);

    const getData = () => {
        setLoading(true);
        Promise.all([
            axios.get("https://daiv-prashna.onrender.com/testimonials").then((res) => setTestimonials(res.data)),
            axios.get("https://daiv-prashna.onrender.com/media").then((res) => setMedia(res.data)),
            axios.get("https://daiv-prashna.onrender.com/article").then((res) => setArticles(res.data)),
        ]).finally(() => setLoading(false));
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (selectedItem) {
            setFormData({
                title: selectedItem.title || "",
                author: selectedItem.author || "",
                image: selectedItem.image || "",
                rating: selectedItem.rating || "",
                review: selectedItem.review || "",
                description: selectedItem.description || ""
            });
        }
    }, [selectedItem]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token || role !== "Admin") {
            alert("Unauthorized!");
            return;
        }

        const url = `https://daiv-prashna.onrender.com/${activeTab === 0 ? "media" : activeTab === 1 ? "testimonials" : "article"}`;

        try {
            const formDataToSend = new FormData();

            formDataToSend.append("title", formData.title);
            formDataToSend.append("description", formData.description);

            if (activeTab === 2) {
                formDataToSend.append("author", formData.author);
            }
            if (activeTab === 1) {
                formDataToSend.append("rating", formData.rating);
                formDataToSend.append("review", formData.review);
            }

            if (imageType === "file" && file) {
                formDataToSend.append("image", file);
            } else if (imageType === "url" && formData.image) {
                formDataToSend.append("imageUrl", formData.image);
            }

            if (editingId && editingId.length > 0) {
                await axios.put(`${url}/${editingId}`, formDataToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });
            } else {
                await axios.post(url, formDataToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });
            }

            getData();
        } catch (error) {
            console.error("Error updating media:", error);
            alert("Failed to update media.");
        }
    };


    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 3
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken);
                setRole(decoded.role);
                setToken(storedToken);
            } catch (error) {
                console.error("Invalid token", error);
                localStorage.removeItem("token");
            }
        }
    }, []);

    const handleCardClick = (item) => {
        setSelectedItem(item);
        setModal(true)
        if (role === "Admin") {
            
            setEditingId(item._id);
        }
    };

    const handleDelete = async (id) => {
        if (!token || role !== "Admin") {
            alert("Unauthorized!");
            return;
        }

        const url = `https://daiv-prashna.onrender.com/${activeTab === 0 ? "media" : activeTab === 1 ? "testimonials" : "article"}`;

        try {
            await axios.delete(`${url}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            getData();
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("Failed to delete item. Please try again.");
        }
    };


    return (
        <>
            <Tabs selectedIndex={activeTab} onSelect={setActiveTab}>
                <TabList className="flex space-x-4 p-2 border-b border-gray-300 cursor-pointer">
                    <Tab className="group px-4 py-2 text-custom-maroon focus:outline-none focus:ring-2 focus:ring-custom-yellow rounded-md transition 
        aria-selected:bg-custom-maroon aria-selected:text-white">
                        Media
                    </Tab>
                    <Tab className="group px-4 py-2 text-custom-maroon focus:outline-none focus:ring-2 focus:ring-custom-yellow rounded-md transition 
        aria-selected:bg-custom-maroon aria-selected:text-white">
                        Testimonials
                    </Tab>
                    <Tab className="group px-4 py-2 text-custom-maroon focus:outline-none focus:ring-2 focus:ring-custom-yellow rounded-md transition 
        aria-selected:bg-custom-maroon aria-selected:text-white">
                        Articles
                    </Tab>
                </TabList>

                {/* MEDIA TAB */}
                <TabPanel>
                    {loading ? <p>Loading...</p> : media.length === 0 ? <p>No media available.</p> :
                        <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000} transitionDuration={500}>
                            {media.map((t) => (
                                <div
                                    key={t._id}
                                    className={`p-4 border rounded shadow h-72 flex flex-col justify-between ${selectedItem?._id === t._id ? "border-red-500" : ""}`}
                                    onClick={() => handleCardClick(t)}
                                >
                                    {/* Image Section */}
                                    <div className="flex justify-center">
                                        <img src={t.image} alt={t.title} className="w-full h-52 rounded-xs" />
                                    </div>

                                    {/* Content Section */}
                                    <div className="text-center">
                                        <h3 className="text-lg font-bold">{t.title}</h3>
                                        <p className="text-custom-maroon">{t.description}</p>
                                    </div>
                                </div>
                            ))}
                        </Carousel>}
                </TabPanel>

                {/* TESTIMONIALS TAB */}
                <TabPanel>
                    {loading ? <p>Loading...</p> : testimonials.length === 0 ? <p>No testimonials available.</p> :
                        <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000} transitionDuration={500}>
                            {testimonials.map((t) => (
                                <div
                                    key={t._id}
                                    className={`p-4 border rounded shadow h-72 flex flex-col justify-between ${selectedItem?._id === t._id ? "border-red-500" : ""}`}
                                    onClick={() => handleCardClick(t)}
                                >
                                    {/* Image Section */}
                                    <div className="flex justify-center">
                                        <img src={t.image} alt={t.name} className="w-full h-52 rounded-xs" />
                                    </div>

                                    {/* Content Section */}
                                    <div className="text-center">
                                        <h3 className="text-lg font-bold">{t.name}</h3>
                                        <p className="text-custom-maroon">{t.review}</p>
                                        <p className="text-custom-maroon">⭐ {t.rating}/5</p>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    }
                </TabPanel>

                {/* ARTICLES TAB */}
                <TabPanel>
                    {loading ? <p>Loading...</p> : articles.length === 0 ? <p>No articles available.</p> :
                        <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000} transitionDuration={500}>
                            {articles.map((t) => (
                                <div
                                    key={t._id}
                                    className={`p-4 border rounded shadow h-72 flex flex-col justify-between ${selectedItem?._id === t._id ? "border-red-500" : ""}`}
                                    onClick={() => handleCardClick(t)}
                                >
                                    {/* Image Section */}
                                    <div className="flex justify-center">
                                        <img src={t.image} alt={t.title} className="w-full h-52 rounded-xs" />
                                    </div>

                                    {/* Content Section */}
                                    <div className="text-center">
                                        <h3 className="text-lg font-bold">{t.title}</h3>
                                        <p className="text-custom-maroon">{t.author}</p>
                                        <p className="text-custom-maroon">{t.description}</p>
                                    </div>
                                </div>
                            ))}
                        </Carousel>}
                </TabPanel>

                {/* FORM FOR ADD/EDIT (Only for Admins) */}
                {token && role === "Admin" && (
                    <form onSubmit={handleSubmit} className="p-4 border rounded shadow mt-4 max-w-md mx-auto bg-gray-100">
                        <h2 className="text-lg font-bold">{selectedItem ? "Edit" : "Add New"} {activeTab === 0 ? "Media" : activeTab === 1 ? "Testimonial" : "Article"}</h2>

                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded mt-2" required />

                        {activeTab === 2 && (
                            <input type="text" name="author" value={formData.author} onChange={handleChange} placeholder="Author" className="w-full p-2 border rounded mt-2" required />
                        )}

                        <div className="mt-2">
                            <label className="mr-4">
                                <input type="radio" value="url" checked={imageType === "url"} onChange={() => setImageType("url")} /> Image URL
                            </label>
                            <label>
                                <input type="radio" value="file" checked={imageType === "file"} onChange={() => setImageType("file")} /> Upload File
                            </label>
                        </div>

                        {imageType === "url" ? (
                            <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded mt-2" required />
                        ) : (
                            <input type="file" onChange={handleFileChange} accept="image/*" className="w-full p-2 border rounded mt-2" required />
                        )}

                        {activeTab === 1 && (
                            <input type="number" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating" className="w-full p-2 border rounded mt-2" required />
                        )}

                        {activeTab === 0 && (
                            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded mt-2" required></textarea>
                        )}

                        {activeTab === 2 && (
                            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded mt-2" required></textarea>
                        )}

                        {activeTab === 1 && (
                            <textarea name="review" value={formData.review} onChange={handleChange} placeholder="Review" className="w-full p-2 border rounded mt-2" required></textarea>
                        )}

                        <div className="flex justify-between mt-2">
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                {selectedItem ? "Update" : "Submit"}
                            </button>
                            {selectedItem && (
                                <button type="button" onClick={() => handleDelete(selectedItem._id)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                                    Delete
                                </button>
                            )}
                        </div>
                    </form>
                )}
            </Tabs>
            {modal && <ModalForCards item={selectedItem} onClose={() => setModal(false)} />}
        </>
    );
};

export default TabsComponent;
