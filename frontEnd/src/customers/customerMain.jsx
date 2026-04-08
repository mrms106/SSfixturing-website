import { useEffect, useState, useRef } from "react"
import './customer.css'
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';
import web from "./web";
import DeleteButton from '../components/bill/deleteButton'

function getFinancialYear(dateStr) {
    const date = new Date(dateStr);
    const month = date.getMonth();
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

const CURRENT_FY = getCurrentFinancialYear();

export default function CustomerMain() {
    const navigate = useNavigate()
    const [customers,    setCustomers]    = useState([])
    const [availableFYs, setAvailableFYs] = useState([])
    const [selectedFY,   setSelectedFY]   = useState(CURRENT_FY)
    const [openMenu,     setOpenMenu]     = useState(null)  // serialNO of open menu
    const menuRef = useRef(null)

    const fetchCustomer = async () => {
        const res = await fetch(`${web}/allcustomers`, { credentials: 'include' })
        if (!res.ok) return alert("failed to fetch customers")
        const data = await res.json()
        const list = data.customers
        setCustomers(list)
        const fySet  = new Set(list.map(c => getFinancialYear(c.createdAt)))
        const sorted = Array.from(fySet).sort()
        setAvailableFYs(sorted)
    }

    useEffect(() => { fetchCustomer() }, [])

    // Close menu on outside click
    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenu(null)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

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

    const duplicateCustomer = async (customer) => {
        setOpenMenu(null)

        const result = await Swal.fire({
            title: 'Duplicate Customer?',
            html: `
                <div style="text-align:left; padding: 4px 0">
                    <p style="margin:0 0 12px; color:#aaa; font-size:14px">This will create a new entry for the current financial year with the same details.</p>
                    <div style="background:#1e1c1f; border:1px solid rgba(255,255,255,0.12); border-radius:10px; padding:14px 16px;">
                        <p style="margin:0 0 6px; font-size:15px; font-weight:600; color:#fff">${customer.name}</p>
                        <p style="margin:0 0 4px; font-size:13px; color:#aaa">${customer.email}</p>
                        <p style="margin:0; font-size:13px; color:#aaa">${customer.contact || ''}</p>
                    </div>
                </div>
            `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Duplicate',
            cancelButtonText: 'Cancel',
            background: '#19171A',
            color: '#fff',
            confirmButtonColor: '#ffffff',
            cancelButtonColor: 'transparent',
            customClass: {
                confirmButton: 'swal-confirm-dark',
                cancelButton:  'swal-cancel-dark',
                popup: 'swal-popup-dark'
            },
            reverseButtons: true
        })

        if (!result.isConfirmed) return

        const payload = {
            name:             customer.name,
            addressBillto:    customer.addressBillto    || '',
            addressSypplyto:  customer.addressSypplyto  || '',
            Statecode:        customer.Statecode        || '',
            gstNo:            customer.gstNo            || '',
            email:            customer.email,
            contact:          customer.contact          || ''
        }

        const res = await fetch(`${web}/addcustomer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(payload)
        })

        if (res.ok) {
            Swal.fire({
                title: 'Duplicated!',
                text: `${customer.name} has been added to ${CURRENT_FY}.`,
                icon: 'success',
                background: '#19171A',
                color: '#fff',
                confirmButtonColor: '#ffffff',
                customClass: { confirmButton: 'swal-confirm-dark' },
                confirmButtonText: 'OK'
            })
            fetchCustomer()
        } else {
            Swal.fire({
                title: 'Failed',
                text: 'Could not duplicate customer. Please try again.',
                icon: 'error',
                background: '#19171A',
                color: '#fff',
                confirmButtonColor: '#ffffff',
                customClass: { confirmButton: 'swal-confirm-dark' },
                confirmButtonText: 'OK'
            })
        }
    }

    const filteredCustomers = selectedFY === 'all'
        ? customers
        : customers.filter(c => getFinancialYear(c.createdAt) === selectedFY)

    return (
        <div className="customer-main">
            <h1>Our Customers</h1>

            <div className="fy-filter">
                <button
                    className={`fy-btn ${selectedFY === 'all' ? 'fy-btn-active' : ''}`}
                    onClick={() => setSelectedFY('all')}
                >All</button>
                {availableFYs.map(fy => (
                    <button
                        key={fy}
                        className={`fy-btn ${selectedFY === fy ? 'fy-btn-active' : ''}`}
                        onClick={() => setSelectedFY(fy)}
                    >{fy}</button>
                ))}
            </div>

            <div className="customer-main2">
                {filteredCustomers.length > 0
                    ? filteredCustomers.map((customer, idx) => {
                        const isCurrentFY = getFinancialYear(customer.createdAt) === CURRENT_FY
                        const isPrevFY    = !isCurrentFY
                        const isMenuOpen  = openMenu === customer.serialNO

                        return (
                            <div className="customer-box" key={idx}>
                                <div className="customer-info" onClick={() => navigate(`/customer/${customer.serialNO}`)}>
                                    <div className="customer-name"><b>Name:&nbsp;</b>{customer.name}</div>
                                    <div className="customer-email"><b>Email:&nbsp;</b>{customer.email}</div>
                                    <div className="customer-colors">
                                        {customer.totalAmount > customer.creditAmount
                                            ? <div className="customer-red"></div>
                                            : <div className="customer-green"></div>}
                                    </div>
                                    {/* Duplicate badge — only for previous FY */}
                                    {isPrevFY && (
                                        <div
                                            className="duplicate-badge"
                                            onClick={(e) => {
                                                e.stopPropagation()   // prevent navigating to customer page
                                                duplicateCustomer(customer)
                                            }}
                                        >
                                            ⧉ Duplicate to {CURRENT_FY}
                                        </div>
                                    )}
                                </div>

                                <div className="customer-line"></div>

                                <div className="customer-btns">
                                    <button onClick={() => navigate(`/update/${customer.serialNO}`)}>Update Info</button>
                                    <DeleteButton pdf={customer} handleDelete={deleteButton} />
                                </div>
                            </div>
                        )
                    })
                    : <p className="no-customers">No customers found for this period.</p>
                }

                <div className="customer-box customer-box2" onClick={() => navigate('/addcustomer')}>
                    <div className="customer-text">
                        Add new customer <i className="fa-solid fa-square-plus"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}