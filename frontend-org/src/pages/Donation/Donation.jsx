import React from "react";
import donationData from "../../Datas/donationData.json";

const Donation = () => {
  return (
    <div className="ml-36 w-3/4 min-h-screen mt-20 font-manrope custom-scrollbar">
      <h1 className="m-4 text-3xl font-semibold">{donationData.title}</h1>
      <p className="m-4 text-xl">{donationData.intro}</p>

      {donationData.projects.map((project, projectIndex) => (
        <div key={projectIndex} className="relative border border-black mb-4 rounded-md p-4">
          <h2 className="mt-5 text-2xl font-semibold">{project.projectTitle}</h2>
          
          {project.sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="mt-5 text-2xl font-semibold">{section.heading}</h3>
              <p className="text-xl">{section.content}</p>
            </div>
          ))}

          <h3 className="mt-5 text-xl font-semibold">Requirements</h3>
          <ol className="text-xl list-disc list-inside">
            {project.requirements.map((requirement, reqIndex) => (
              <li key={reqIndex}>
                {requirement.item}
                <span><b>: &#8377;{requirement.cost}</b></span>
              </li>
            ))}
          </ol>

          <h3 className="font-bold text-xl mb-9">Total Cost: &#8377;{project.totalCost}</h3>
          <p className="text-xl mb-4">
            For financial contributions, you can make a donation directly via {project.paymentInfo.method}.
            <p>Google Pay Number: <b>{project.paymentInfo.number}</b></p>

            {project.contactInfo}<b>{project.contactEmail}</b>
          </p>

          {/* QR Code positioned at the top right corner */}
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" 
            alt="QR Code for payment" 
            className="relative bottom-4 right-4 w-25 h-25" 
          />
        </div>
      ))}
    </div>
  );
};

export default Donation;
