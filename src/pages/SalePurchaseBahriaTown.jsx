import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import '../styles/Pages.css';

const SalePurchaseBahriaTown = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <SEO
        title="Sale Purchase Cars in Bahria Town Karachi"
        description="Expert sale and purchase services for cars in Bahria Town Karachi. BTK Cars offers hassle-free buying and selling with fair valuations and transparent processes."
        keywords="sale purchase cars Bahria Town, buy sell cars Karachi, car dealership Bahria Town Karachi, sell my car Bahria Town, trade-in cars Pakistan"
        canonical="/sale-purchase-cars-bahria-town"
      />

      <div className="page-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 className="page-title">Sale Purchase Cars in Bahria Town Karachi</h1>

        <div style={{
          lineHeight: '1.8',
          color: '#333',
          fontSize: '16px',
          marginTop: '2rem'
        }}>
          <p style={{ marginBottom: '1.5rem' }}>
            BTK Cars is your complete solution for sale and purchase of vehicles in Bahria Town Karachi.
            Whether you're looking to buy your next car or sell your current vehicle, we provide a
            seamless, transparent, and trustworthy service that has made us the go-to choice for
            residents of Bahria Town and surrounding areas.
          </p>

          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginTop: '2rem',
            marginBottom: '1rem',
            color: '#1a1a1a'
          }}>
            Buying Your Next Car in Bahria Town
          </h2>

          <p style={{ marginBottom: '1.5rem' }}>
            When you choose BTK Cars for your vehicle purchase, you're choosing peace of mind. Our
            comprehensive buying process starts with understanding your needs and budget. We maintain
            an extensive inventory of quality vehicles, each thoroughly inspected and verified to meet
            our strict standards. From compact city cars to spacious SUVs, our selection caters to
            every lifestyle and requirement in Bahria Town Karachi.
          </p>

          <p style={{ marginBottom: '1.5rem' }}>
            What makes our purchase process special is the transparency we bring. Every vehicle comes
            with a detailed history report, and our team is always ready to answer your questions
            honestly. We believe informed customers make better decisions, which is why we never rush
            you and always encourage thorough test drives around Bahria Town before you commit.
          </p>

          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginTop: '2rem',
            marginBottom: '1rem',
            color: '#1a1a1a'
          }}>
            Selling Your Car - Fast and Fair
          </h2>

          <p style={{ marginBottom: '1.5rem' }}>
            Looking to sell your car in Bahria Town? BTK Cars offers the most straightforward selling
            experience in Karachi. Our expert evaluators provide fair market valuations based on
            current market trends and your vehicle's condition. We handle all the paperwork and legal
            formalities, making the entire process hassle-free for you.
          </p>

          <p style={{ marginBottom: '1.5rem' }}>
            Unlike private sales that can drag on for weeks or months, selling to BTK Cars means quick
            closure. Once we agree on a fair price, we can complete the transaction swiftly, putting
            cash in your hands without the usual headaches of finding buyers, negotiating endlessly,
            or worrying about documentation issues.
          </p>

          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginTop: '2rem',
            marginBottom: '1rem',
            color: '#1a1a1a'
          }}>
            Trade-In Options for Bahria Town Residents
          </h2>

          <p style={{ marginBottom: '1.5rem' }}>
            Want to upgrade your current vehicle? Our trade-in service makes it incredibly convenient.
            Bring your existing car to our Bahria Town location, and we'll provide a competitive
            valuation that you can use toward purchasing your next vehicle from our inventory. This
            one-stop solution saves you time and eliminates the complexity of selling privately while
            shopping for a new car.
          </p>

          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginTop: '2rem',
            marginBottom: '1rem',
            color: '#1a1a1a'
          }}>
            Why Bahria Town Trusts BTK Cars
          </h2>

          <p style={{ marginBottom: '1.5rem' }}>
            Our reputation in Bahria Town Karachi is built on years of honest dealings and satisfied
            customers. We understand the local market dynamics and maintain pricing that reflects true
            value. Our team's expertise in both buying and selling ensures you get the best deal,
            whether you're on either side of the transaction.
          </p>

          <p style={{ marginBottom: '2rem' }}>
            Visit our showroom in Bahria Town today to experience the BTK Cars difference. Whether
            you're buying, selling, or trading in, our friendly team is ready to assist you with
            professional service that puts your satisfaction first.
          </p>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginTop: '3rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => navigate('/buy')}
              style={{
                backgroundColor: '#d32f2f',
                color: 'white',
                padding: '14px 40px',
                fontSize: '16px',
                fontWeight: '600',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#b71c1c'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#d32f2f'}
            >
              Browse Cars to Buy
            </button>
            <button
              onClick={() => navigate('/sell')}
              style={{
                backgroundColor: '#1976d2',
                color: 'white',
                padding: '14px 40px',
                fontSize: '16px',
                fontWeight: '600',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1565c0'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#1976d2'}
            >
              Sell Your Car
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalePurchaseBahriaTown;
