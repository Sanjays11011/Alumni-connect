import React, { useState } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';

const AddDonation = ({ onClose, refreshDonations }) => {
    const [formData, setFormData] = useState({
        title: "",
        intro: "",
        review: "",
        requirements: [],
        amount: "" // Updated to a single value
    });
    
    const [requirementInput, setRequirementInput] = useState("");

    const inputFields = [
        { label: "Title", name: "title" },
        { label: "Introduction", name: "intro" },
        { label: "Project Review", name: "review" },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAddRequirement = () => {
        if (requirementInput.trim()) {
            setFormData((prevData) => ({
                ...prevData,
                requirements: [...prevData.requirements, requirementInput]
            }));
            setRequirementInput("");
        }
    };

    const handleRemoveRequirement = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            requirements: prevData.requirements.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/donation', formData);
            refreshDonations();
            onClose();
        } catch (error) {
            console.error('Error adding donation:', error);
        }
    };

    return (
        <>
            <div className='fixed w-[100vw] h-screen top-0 left-0 bg-black opacity-60'></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto w-3/4 bg-white z-20 shadow-lg rounded-md overflow-y-auto max-h-[80vh] custom-scrollbar">
                <button className="absolute top-3 right-3" onClick={onClose}>
                    <Icon icon="iconamoon:close-bold" width="2rem" height="2rem"/>
                </button>
                <p className="m-3 text-xl border-b">Donation Request</p>
                <form className='grid grid-cols-2' onSubmit={handleSubmit}>
                    {inputFields.map((input) => (
                        <div className="flex flex-col m-3 gap-4 w-3/4" key={input.name}>
                            <label htmlFor={input.name}>{input.label}</label>
                            <input
                                type="text"
                                name={input.name}
                                id={input.name}
                                className="input-style"
                                value={formData[input.name]}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    ))}

                    {/* Requirements input with add/remove functionality */}
                    <div className="flex flex-col m-3 gap-4 w-3/4">
                        <label htmlFor="requirements">Requirements</label>
                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                placeholder="Add a requirement"
                                className="input-style"
                                value={requirementInput}
                                onChange={(e) => setRequirementInput(e.target.value)}
                            />
                            <button
                                type="button"
                                className="bg-primary duration-200 hover:bg-blue-500 text-white rounded-xl px-3 py-2"
                                onClick={handleAddRequirement}
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {formData.requirements.map((requirement, index) => (
                                <div key={index} className="bg-gray-200 px-3 py-1 rounded-full flex items-center">
                                    {requirement}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveRequirement(index)}
                                        className="ml-2 text-red-500 hover:text-red-700"
                                    >
                                        <Icon icon="iconamoon:close-bold" width="1rem" height="1rem" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Amount input field */}
                    <div className="flex flex-col m-3 gap-4 w-3/4">
                        <label htmlFor="amount">Donation Amount</label>
                        <input
                            type="number"
                            name="amount"
                            placeholder="Enter amount"
                            className="input-style"
                            value={formData.amount}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </form>
                <button type="submit" className="bg-primary duration-200 hover:bg-blue-500 text-white rounded-xl px-10 py-2 m-7 w-30" onClick={handleSubmit}>
                    Add Donation
                </button>
            </div>
        </>
    );
};

export default AddDonation;
