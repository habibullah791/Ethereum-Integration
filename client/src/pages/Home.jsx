import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';
import { FaCopy } from 'react-icons/fa';
import { toast } from 'react-hot-toast'; // Import the toast function

export default function Home() {
    const { user } = useAuth();
    const getUser = useUser();

    useEffect(() => {
        getUser();
    }, [getUser]);

    const copyToClipboard = (address) => {
        navigator.clipboard.writeText(address).then(() => {
            toast.success('Ethereum address copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    const getPartialAddress = (address) => {
        if (address) {
            return `${address.slice(0, 6)}...${address.slice(-4)}`;
        }
        return '';
    };

    return (
        <div className='container mt-5'>
            <div className='card mb-4 shadow-sm' style={{ width: '18rem' }}>
                <div className='card-header text-center bg-dark text-white'>
                    <h5 className='m-0'>Ethereum Wallet Info</h5>
                </div>
                <div className='card-body'>
                    {user?.email !== undefined ? (
                        <div>
                            <p className='card-text'>
                                <strong>Address:</strong>
                                <span className='ms-2'>
                                    {getPartialAddress(user.ethereum_wallet_address)} 
                                    <FaCopy 
                                        className='copy-icon text-primary ms-2' 
                                        style={{ cursor: 'pointer' }} 
                                        onClick={() => copyToClipboard(user.ethereum_wallet_address)} 
                                    />
                                </span>
                            </p>
                            <p className='card-text'>
                                <strong>Wallet Balance:</strong> 
                                {user.wallet_balance !== null ? `${user.wallet_balance} ETH` : 'Balance not available'}
                            </p>
                        </div>
                    ) : (
                        <p className='text-danger'>Please login first</p>
                    )}
                </div>
            </div>
        </div>
    );
}