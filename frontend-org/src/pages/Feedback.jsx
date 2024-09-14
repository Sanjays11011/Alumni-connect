import FormfacadeEmbed from "@formfacade/embed-react";

import React from 'react'

const Feedback = () => {
  return (
    <div className="mt-16">
        <FormfacadeEmbed

    formFacadeURL="https://formfacade.com/include/100075111896543709253/form/1FAIpQLSfNUXS-lCP9p64QZBfgPAoF5h3Q49RFxwbT-SRaquIoDLJVVw/classic.js/?div=ff-compose"

    onSubmitForm={() => console.log('Form submitted')}

    />
    </div>
    )
    }

export default Feedback
