import { useEffect, useState } from "react"
import './customer.css'
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';
import web from "./web";
import DeleteButton from '../components/bill/deleteButton'

function getFinancialYear(dateStr) {
    const date = new Date(dateStr);
    const m = date.getMonth(), y = date.getFullYear();
    const s = m >= 3 ? y : y - 1;
    return `${s}-${s + 1}`;
}

function getCurrentFinancialYear() {
    const now = new Date();
    const m = now.getMonth(), y = now.getFullYear();
    const s = m >= 3 ? y : y - 1;
    return `${s}-${s + 1}`;
}

function getInitials(name = '') {
    const parts = name.trim().split(' ')
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[1][0]).toUpperCase()
}

const CURRENT_FY = getCurrentFinancialYear();

export default function CustomerMain() {
    const navigate = useNavigate()
    const [customers,    setCustomers]    = useState([])
    const [availableFYs, setAvailableFYs] = useState([])
    const [selectedFY,   setSelectedFY]   = useState(CURRENT_FY)
    const [statusFilter, setStatusFilter] = useState('all')
    const [search,       setSearch]       = useState('')
    const [loading,      setLoading]      = useState(true)

    const fetchCustomer = async () => {
        setLoading(true)
        const res = await fetch(`${web}/allcustomers`, { credentials: 'include' })
        if (!res.ok) { alert("failed to fetch customers"); setLoading(false); return }
        const data = await res.json()
        const list = data.customers
        setCustomers(list)
        const sorted = [...new Set(list.map(c => getFinancialYear(c.createdAt)))].sort()
        setAvailableFYs(sorted)
        setLoading(false)
    }

    useEffect(() => { fetchCustomer() }, [])

    const deleteButton = async (serialNo) => {
        const res = await fetch(`${web}/deletecustomer/${serialNo}`, { method: 'DELETE', credentials: 'include' })
        if (res.ok) {
            Swal.fire({ title: 'Deleted!', icon: 'success', confirmButtonText: 'OK', allowOutsideClick: false })
            fetchCustomer()
        } else {
            Swal.fire({ title: 'Failed', text: 'Could not delete. Try again.', icon: 'error', confirmButtonText: 'OK' })
        }
    }

    const duplicateCustomer = async (customer) => {
        const result = await Swal.fire({
            title: 'Duplicate Customer?',
            html: `<div style="text-align:left">
                <p style="color:#aaa;font-size:13px;margin:0 0 10px">Creates a new entry for <b style="color:#fff">${CURRENT_FY}</b> with the same details.</p>
                <div style="background:#1e1c1f;border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px 14px">
                    <p style="margin:0 0 4px;font-size:15px;font-weight:600;color:#fff">${customer.name}</p>
                    <p style="margin:0;font-size:13px;color:#aaa">${customer.email}</p>
                </div>
            </div>`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Duplicate',
            cancelButtonText: 'Cancel',
            background: '#19171A', color: '#fff', confirmButtonColor: '#fff',
            reverseButtons: true,
            customClass: { confirmButton: 'swal-confirm-dark', cancelButton: 'swal-cancel-dark', popup: 'swal-popup-dark' }
        })

        if (!result.isConfirmed) return

        const res = await fetch(`${web}/addcustomer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                name: customer.name, addressBillto: customer.addressBillto || '',
                addressSypplyto: customer.addressSypplyto || '', Statecode: customer.Statecode || '',
                gstNo: customer.gstNo || '', email: customer.email, contact: customer.contact || ''
            })
        })

        Swal.fire({
            title: res.ok ? 'Duplicated!' : 'Failed',
            text: res.ok ? `${customer.name} added to ${CURRENT_FY}.` : 'Could not duplicate. Try again.',
            icon: res.ok ? 'success' : 'error',
            background: '#19171A', color: '#fff', confirmButtonColor: '#fff',
            customClass: { confirmButton: 'swal-confirm-dark', popup: 'swal-popup-dark' }
        })
        if (res.ok) fetchCustomer()
    }

    const fyList = selectedFY === 'all' ? customers : customers.filter(c => getFinancialYear(c.createdAt) === selectedFY)

    const stats = fyList.reduce((acc, c) => ({
        total:   acc.total   + (c.totalAmount   || 0),
        credit:  acc.credit  + (c.creditAmount  || 0),
        pending: acc.pending + (c.pendingAmount || 0),
    }), { total: 0, credit: 0, pending: 0 })

    const filteredCustomers = fyList.filter(c => {
        const isRed = c.totalAmount > c.creditAmount
        if (statusFilter === 'red'   && !isRed) return false
        if (statusFilter === 'green' &&  isRed) return false
        if (search) {
            const q = search.toLowerCase()
            return c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q)
        }
        return true
    })

    return (
        <div className="customer-main">
            <h1>Our Customers</h1>

            {/* FY Filter */}
            <div className="fy-filter">
                <button className={`fy-btn ${selectedFY === 'all' ? 'fy-btn-active' : ''}`} onClick={() => setSelectedFY('all')}>All</button>
                {availableFYs.map(fy => (
                    <button key={fy} className={`fy-btn ${selectedFY === fy ? 'fy-btn-active' : ''}`} onClick={() => setSelectedFY(fy)}>{fy}</button>
                ))}
            </div>

            {/* Business Summary */}
            <div className="biz-summary">
                <div className="biz-label">{selectedFY === 'all' ? 'All Years' : selectedFY} — Business Overview</div>
                <div className="biz-stats">
                    <div className="biz-stat">
                        <span>Total Business</span>
                        <strong>₹ {stats.total.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="biz-divider"/>
                    <div className="biz-stat green">
                        <span>Credited</span>
                   <strong>₹ {stats.credit.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="biz-divider"/>
                    <div className="biz-stat red">
                        <span>Pending</span>
                      <strong>₹ {stats.pending.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="biz-divider"/>
                    <div className="biz-stat">
                        <span>Customers</span>
                        <strong>{fyList.length}</strong>
                    </div>
                </div>
            </div>

            {/* Search + Status */}
            <div className="search-filter-row">
                <div className="search-box">
                    <i className="fa-solid fa-magnifying-glass search-icon"/>
                    <input
                        type="text"
                        placeholder="Search name or email..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    {search && <button className="clear-search" onClick={() => setSearch('')}>✕</button>}
                </div>
                <div className="status-filter">
                    {['all','green','red'].map(s => (
                        <button key={s} className={`status-btn ${statusFilter === s ? 'status-active' : ''} status-${s}`} onClick={() => setStatusFilter(s)}>
                            {s === 'all' ? 'All' : s === 'green' ? '● Cleared' : '● Pending'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Loader */}
            {loading ? (
                <div className="customers-loader">
                    <div className="loader-spinner"/>
                    <span>Loading customers...</span>
                </div>
            ) : (
                <div className="customer-main2">
                    {filteredCustomers.length > 0
                        ? filteredCustomers.map((customer, idx) => {
                            const isPrevFY  = getFinancialYear(customer.createdAt) !== CURRENT_FY
                            const isRed     = customer.totalAmount > customer.creditAmount
                            const initials  = getInitials(customer.name)

                            return (
                                <div className={`customer-box ${isRed ? 'card-red' : 'card-green'}`} key={idx}>

                                    {/* Avatar */}
                                    <div className={`customer-avatar ${isRed ? 'avatar-red' : 'avatar-green'}`}>
                                        {initials}
                                    </div>

                                    {/* Info */}
                                    <div className="customer-info" onClick={() => navigate(`/customer/${customer.serialNO}`)}>
                                        <div className="customer-name"><b>Name:&nbsp;</b>{customer.name}</div>
                                        <div className="customer-email"><b>Email:&nbsp;</b>{customer.email}</div>

                                        {/* Pending tag */}
                                        {/* <div className={`pending-tag ${isRed ? 'tag-red' : 'tag-green'}`}>
                                            {isRed
                                                ? `₹ ${(customer.pendingAmount || 0).toLocaleString()} pending`
                                                : `₹ ${(customer.creditAmount  || 0).toLocaleString()} cleared`}
                                        </div> */}

                                        {isPrevFY && (
                                            <div className="duplicate-badge" onClick={e => { e.stopPropagation(); duplicateCustomer(customer) }}>
                                                ⧉ Duplicate to {CURRENT_FY}
                                            </div>
                                        )}
                                    </div>

                                    <div className="customer-line"/>

                                    <div className="customer-btns">
                                        <button onClick={() => navigate(`/update/${customer.serialNO}`)}>Update Info</button>
                                        <DeleteButton pdf={customer} handleDelete={deleteButton} />
                                    </div>
                                </div>
                            )
                        })
                        : <p className="no-customers">No customers found.</p>
                    }

                    <div className="customer-box customer-box2" onClick={() => navigate('/addcustomer')}>
                        <div className="customer-text">Add new customer <i className="fa-solid fa-square-plus"/></div>
                    </div>
                </div>
            )}
        </div>
    )
}