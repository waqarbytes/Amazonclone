import React, { useState } from 'react';
import { ShippingAddress } from '../../types';
import { getSavedAddresses, saveAddress, deleteAddress } from '../../utils/orderStorage';
import { AddressForm } from './AddressForm';
import { Button } from '../common/Button';
import { MapPin, Plus, Edit2, Trash2, CheckCircle2 } from 'lucide-react';

interface AddressSelectorProps {
  selectedAddress: ShippingAddress;
  onSelectAddress: (address: ShippingAddress) => void;
  onContinue: () => void;
}

export const AddressSelector: React.FC<AddressSelectorProps> = ({
  selectedAddress,
  onSelectAddress,
  onContinue
}) => {
  const [addresses, setAddresses] = useState<ShippingAddress[]>(getSavedAddresses);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingAddress, setEditingAddress] = useState<ShippingAddress | null>(null);

  const handleSaveAddress = (address: ShippingAddress) => {
    saveAddress(address);
    const updated = getSavedAddresses();
    setAddresses(updated);
    onSelectAddress(address);
    setIsAddingNew(false);
    setEditingAddress(null);
  };

  const handleDelete = (id?: string) => {
    if (!id) return;
    deleteAddress(id);
    const updated = getSavedAddresses();
    setAddresses(updated);
    if (selectedAddress.id === id && updated.length > 0) {
      onSelectAddress(updated[0]);
    }
  };

  if (isAddingNew || editingAddress) {
    return (
      <div className="space-y-4">
        <h3 className="text-base font-bold text-amazon-text">
          {editingAddress ? 'Edit shipping address' : 'Add a new shipping address'}
        </h3>
        <AddressForm
          initialAddress={editingAddress}
          onSave={handleSaveAddress}
          onCancel={() => {
            setIsAddingNew(false);
            setEditingAddress(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-amazon-text flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amazon-amber" /> Select a delivery address
          </h2>
          <p className="text-xs text-amazon-muted">
            Choose where your package should be delivered or add a new shipping destination.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddingNew(true)}
          className="text-xs text-amazon-link hover:underline font-bold flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" /> Add new address
        </button>
      </div>

      {/* Addresses Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {addresses.map((addr) => {
          const isSelected = selectedAddress.id === addr.id || 
            (!selectedAddress.id && selectedAddress.street === addr.street);

          return (
            <div
              key={addr.id || addr.street}
              onClick={() => onSelectAddress(addr)}
              className={`
                relative p-4 rounded-xl border-2 transition cursor-pointer flex flex-col justify-between text-xs
                ${isSelected 
                  ? 'border-amazon-amber bg-amber-50/40 shadow-xs ring-1 ring-amazon-amber/20' 
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50'}
              `}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-amazon-text">{addr.fullName}</span>
                  {isSelected && (
                    <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Selected
                    </span>
                  )}
                </div>

                <p className="text-gray-700 leading-relaxed">
                  {addr.street}{addr.apt ? `, ${addr.apt}` : ''}<br />
                  {addr.city}, {addr.state} {addr.zipCode}<br />
                  {addr.country}
                </p>

                <p className="text-gray-500 font-medium pt-1">
                  Phone: {addr.phone}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 text-[11px]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingAddress(addr);
                  }}
                  className="text-amazon-link hover:underline font-semibold flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" /> Edit
                </button>

                {addresses.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(addr.id);
                    }}
                    className="text-gray-400 hover:text-red-600 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue Action */}
      <div className="pt-3 flex justify-end">
        <Button
          variant="primary"
          size="lg"
          onClick={onContinue}
          className="font-bold px-8"
        >
          Deliver to this address
        </Button>
      </div>
    </div>
  );
};
