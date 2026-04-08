import { useEffect, useState } from "react"
import './customer.css'
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';
import web from "./web";
import DeleteButton from '../components/bill/deleteButton'

// India FY: April 1 → March 31
function getFinancialYear(dateStr) {
    const date = new Date(dateStr);
    const month = date.getMonth();   // 0-indexed: March=2, April=3
    const year  = date.getFullYear();
    const fyStart = month >= 3 ? year : year - 1;
    return `${fyStart}-${fyStart + 1}`;
}

function getCurrentFinancialYear() {
    const now   = new Date();
    const month = now.getMonth();
    const year  = now.getFullYear();
    const fyStart = month >= 3 ? year : year - 1;
    return `${fyStart}-${fyStart + 1}`;
}

export default function CustomerMain() {
    const navigate = useNavigate()
    const [customers,    setCustomers]    = useState([])
    const [availableFYs, setAvailableFYs] = useState([])
    const [selectedFY,   setSelectedFY]   = useState(getCurrentFinancialYear())

    const fetchCustomer = async () => {
        const res = await fetch(`${web}/allcustomers`, { credentials: 'include' })
        if (!res.ok) return alert("failed to fetch customers")
        const data = await res.json()
        const list = data.customers
        setCustomers(list)

        // Build sorted unique FY list from actual createdAt dates
        const fySet   = new Set(list.map(c => getFinancialYear(c.createdAt)))
        const sorted  = Array.from(fySet).sort()
        setAvailableFYs(sorted)
    }

    useEffect(() => { fetchCustomer() }, [])

    const deleteButton = async (serialNo) => {
        const res = await fetch(`${web}/deletecustomer/${serialNo}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        if (res.ok) {
            Swal.fire({
                title: 'Successful',
                text: 'Customer deleted successfully!',
                icon: 'success',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: 'OK'
            })
            fetchCustomer()
            return;
        }
        Swal.fire({
            title: 'Failed',
            text: 'Failed to delete customer. Please try again.',
            icon: 'error',
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonText: 'OK'
        })
    }

    const filteredCustomers = selectedFY === 'all'
        ? customers
        : customers.filter(c => getFinancialYear(c.createdAt) === selectedFY)

    return (
        <>
            <div className="customer-main">
                <h1>Our Customers</h1>

                {/* ── Financial Year Filter ── */}
                <div className="fy-filter">
                    <button
                        className={`fy-btn ${selectedFY === 'all' ? 'fy-btn-active' : ''}`}
                        onClick={() => setSelectedFY('all')}
                    >
                        All
                    </button>
                    {availableFYs.map(fy => (
                        <button
                            key={fy}
                            className={`fy-btn ${selectedFY === fy ? 'fy-btn-active' : ''}`}
                            onClick={() => setSelectedFY(fy)}
                        >
                            {fy}
                        </button>
                    ))}
                </div>

                <div className="customer-main2">
                    {filteredCustomers.length > 0
                        ? filteredCustomers.map((customer, idx) => (
                            <div className="customer-box" key={idx}>
                                <div className="customer-info" onClick={() => navigate(`/customer/${customer.serialNO}`)}>
                                    <div className="customer-name"><b>Name:&nbsp;</b>{customer.name}</div>
                                    <div className="customer-email"><b>Email:&nbsp;</b>{customer.email}</div>
                                    <div className="customer-colors">
                                        {customer.totalAmount > customer.creditAmount
                                            ? <div className="customer-red"></div>
                                            : <div className="customer-green"></div>}
                                    </div>
                                </div>
                                <div className="customer-line"></div>
                                <div className="customer-btns">
                                    <button onClick={() => navigate(`/update/${customer.serialNO}`)}>Update Info</button>
                                    <DeleteButton pdf={customer} handleDelete={deleteButton} />
                                </div>
                            </div>
                        ))
                        : <p className="no-customers">No customers found for this period.</p>
                    }

                    <div className="customer-box customer-box2" onClick={() => navigate('/addcustomer')}>
                        <div className="customer-text">
                            Add new customer <i className="fa-solid fa-square-plus"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}