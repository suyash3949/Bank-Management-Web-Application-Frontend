// this is navigation bar consisting 3 nav bars  | I used link for routing..


import React, { useEffect, useState } from 'react';
import {Navbar,Nav,Container,Dropdown,Form,Button,} from "react-bootstrap";
import { FaSearch, FaMicrophone, FaBell, FaChevronDown, FaPhone, FaRupeeSign } from "react-icons/fa";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // JavaScript
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap
import logo from "../Images/logo1.jpg";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";      // I avoid to use Outlet as per code requirement..

const NaviBar = () => {

  const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);   

    useEffect(() => {
        fetch('/json/names.json')
            .then((response) => {
                if (!response.ok) { 
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((json) => {   
                setData(json);
                setFilteredData(json);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching the JSON file:', error);
                setIsLoading(false);
            });
    }, []);

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = data.filter(
            (item) =>
                item.name.toLowerCase().includes(term) ||
                String(item.id).includes(term)
        );
        setFilteredData(filtered);
    };
  // const navigate=useNavigate();
  // const handleaccountform=()=>{
  //   navigate("/createacform")
  // }
  return (
    <div className="" id="topnavig">
      {/* Top Navigation Bar */}

      <Navbar bg="light" expand="lg" className="border-bottom py-0">
        <Container  className="px-1">
          <Navbar.Toggle aria-controls="top-navbar" />
          <Navbar.Collapse id="top-navbar">
            <Nav className="d-flex align-items-center justify-content-between w-100">
              <Nav className="d-flex align-items-center">
                <Button variant="warning" className="me-2 text-white fw-bold">
                  <Link to="/Personal" >Personal</Link>
                </Button>
                <Nav.Link href="#nri" className="text-dark fw-semibold ">
                  <Link to="/NRI">NRI</Link>
                </Nav.Link>
                <Nav.Link href="#business" className="text-dark fw-semibold">
                  <Link to="/Business">Business</Link>
                </Nav.Link>
                <Nav.Link href="#corporate" className="text-dark fw-semibold">
                  Corporate
                </Nav.Link>
              </Nav>
              <Nav className="d-flex align-items-center">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    className="text-dark fw-semibold"
                  >
                    Investor Relations
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#action1">
                      Financial Reports
                    </Dropdown.Item>
                    <Dropdown.Item href="#action2"><Link to="/FAQ">Investor FAQ</Link></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    className="text-dark fw-semibold"
                  >
                    About Us
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#history">
                        <Link to="/OurHistory">Our History</Link></Dropdown.Item>
                    <Dropdown.Item href="#team"><Link to="/Leader">Leadership Team</Link></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Nav.Link
                  href="#complaints"
                  className="text-dark fw-semibold"
                >
                  Complaints
                </Nav.Link>
              </Nav>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Middle Navigation Bar */}


      <Navbar bg="white" expand="lg" className="py-0 border-bottom " id="midnav">
        <Container  className="px-1">
          <Link to="/"><Navbar.Brand >
            <img
              src= {logo}
              alt="Logo"
              style={{ height: "60px", cursor: "pointer" ,borderRadius:'50%'  }}
            />
             <span className="fw-bold fst-italic"> Your<FaRupeeSign/>Bank</span>
          </Navbar.Brand></Link>
          <Navbar.Toggle aria-controls="middle-navbar" />
          <Navbar.Collapse id="middle-navbar">
            <Form className="d-flex align-items-center flex-grow-1 mx-3">
            <div className='container mt-4'>
            
            {/* This is code for useEffect */}

            <input
                type='text'
                className='form-control mb-0 sticky-top topnav' 
                placeholder='Search by ID or name'
                value={searchTerm}
                onChange={handleSearch}
            />
            {isLoading && <p>Loading...</p>}
            {!isLoading && searchTerm && filteredData.length > 0 && (
                <div className='row'>
                    {filteredData.map((item) => (
                        <div key={item.id} className='col-md-4 mb-3'>
                            <div className='card'>
                                
                                <div className='card-body'>
                                    <h5 className='card-title'>{item.name}</h5>
                                    <img src={item.image} className='' alt={item.name} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                                    <p className='card-text'>{item.description}</p>
                                    <a href={item.link} target='_blank' rel='noopener noreferrer' className='btn btn-primary'>
                                        More Info  
                                    </a>
                                </div> 
                            </div>
                        </div>
                    ))}
                </div> 
            )}
            {!isLoading && searchTerm && filteredData.length === 0 && <p>No results found.</p>}
        </div>
  
              <Button variant="outline-light" className="me-2">
                <FaSearch className="text-warning" />
              </Button>
              <FaMicrophone className="text-warning fs-5" />
            </Form>
            <Nav className="d-flex align-items-center">
              <Button variant="outline-danger" className="me-3">
                <FaPhone className="me-1" /> 18001080
              </Button>
              <Dropdown>
                <Dropdown.Toggle variant="warning">
                  Login <FaChevronDown />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#profile"><Link to="/Login">Login Profile</Link></Dropdown.Item>
                  <Dropdown.Item href="#logout">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div className="ms-3 position-relative">
                <FaBell className="text-warning fs-5" />
                <span className="notification-badge">21</span>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Bottom Navigation Bar */} 


      <Navbar expand="lg" className="py-0 Lastnav">
        <Container  className="px-3">
          <Navbar.Toggle aria-controls="bottom-navbar" />
          <Navbar.Collapse id="bottom-navbar">
            <Nav className="d-flex flex-wrap justify-content-center ">
              {[
                {
                  label: "Accounts",
                  options: [
                    <Link to="/Saving">Saving Account</Link>,
                    <Link to="/Current">Current Account</Link>,
                    "Saving Account",
                    "Fixed Deposits",
                    // <a href="##" onClick={handleaccountform} className="text-decoration-none text-dark">Saving Account</a>
                  ],
                },
                {
                  label: "Deposits",
                  options: [
                    <Link to="/Depo">Deposites</Link>,
                    "Recurring Deposit",
                    "Fixed Deposit",
                    "Sweep-in Facility",
                  ],
                },
                {
                  label: "Payments",
                  options: [ <Link to="/Payments">Paymenst</Link>,"UPI", "NEFT", "IMPS", "Bill Payments"],
                },
                {
                  label: "Cards",
                  options: [ <Link to ="/allcard" className=" text-decoration-none">Cards</Link>,
                    "Debit Cards", "Prepaid Cards",
                    <a href="#cardd" className="text-dark  text-decoration-none">Credit card</a>,
                    
                  ],
                },
                {
                  label: "Loans",
                  options: [ <Link to="/Loan">Loans</Link>, "Personal Loan", "Car Loan",
                    <a href="#loan" className="text-dark text-decoration-none">Home Loan</a>
                  ],
                  
                },
                {
                  label: "Investments",
                  options: [ <Link to="/Invest">Investments</Link>,
                    "Mutual Funds", "Stocks", "Bonds"],
                },
                {
                  label: "Insurance",
                  options: [
                    <Link to="/Insurance">Insurance</Link>,
                    "Health Insurance",
                    "Life Insurance",
                    "Car Insurance",
                  ],
                },
                {
                  label: "Special Services",
                  options: [
                    "Wealth Management",
                    "Portfolio Advisory",
                  ],
                },
                // {
                //   label: "Knowledge Hub",
                //   options: [<Link to="/Knowledge">K.Hub</Link>, "Articles", "Videos", "FAQs"],
                // },
              ].map((item, index) => (
                <Dropdown key={index} className="mx-2">
                  <Dropdown.Toggle
                    variant="light"
                    className="text-dark fw-semibold"
                  >
                    {item.label}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {item.options.map((option, optIndex) => (
                      <Dropdown.Item
                        key={optIndex}
                        href={`#${item.label.toLowerCase()}-${optIndex}`}
                      >
                        {option}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Outlet/> */}
    </div>
  );
};

export default NaviBar;


