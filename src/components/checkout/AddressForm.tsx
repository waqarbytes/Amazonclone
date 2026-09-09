import React, { useState } from 'react';
import { ShippingAddress } from '../../types';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

interface AddressFormProps {
  initialAddress?: ShippingAddress | null;
  onSave: (address: ShippingAddress) => void;
  onCancel: () => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({ initialAddress, onSave, onCancel }) => {
  const [fullName, setFullName] = useState(initialAddress?.fullName || '');
  const [street, setStreet] = useState(initialAddress?.street || '');
  const [apt, setApt] = useState(initialAddress?.apt || '');
  const [city, setCity] = useState(initialAddress?.city || '');
  const [state, setState] = useState(initialAddress?.state || '');
  const [zipCode, setZipCode] = useState(initialAddress?.zipCode || '');
  const [country] = useState(initialAddress?.country || 'United States');
  const [phone, setPhone] = useState(initialAddress?.phone || '');
  const [isDefault, setIsDefault] = useState(initialAddress?.isDefault || false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!street.trim()) newErrors.street = 'Street address is required';
    if (!city.trim()) newErrors.city = 'City is required';
    if (!state.trim()) newErrors.state = 'State is required';
    if (!zipCode.trim()) {
      newErrors.zipCode = 'ZIP Code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(zipCode.trim())) {
      newErrors.zipCode = 'Enter a valid 5-digit ZIP Code';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (phone.trim().length < 7) {
      newErrors.phone = 'Enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      id: initialAddress?.id || `addr-${Date.now()}`,
      fullName: fullName.trim(),
      street: street.trim(),
      apt: apt.trim() || undefined,
      city: city.trim(),
      state: state.trim().toUpperCase(),
      zipCode: zipCode.trim(),
      country,
      phone: phone.trim(),
      isDefault
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Input
            label="Full Name *"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="First and last name"
          />
          {errors.fullName && <p className="text-red-600 text-xs mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <Input
            label="Phone Number *"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(555) 000-0000"
          />
          {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div className="sm:col-span-2">
          <Input
            label="Street Address *"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Street address or P.O. Box"
          />
          {errors.street && <p className="text-red-600 text-xs mt-1">{errors.street}</p>}
        </div>

        <div className="sm:col-span-2">
          <Input
            label="Apt, Suite, Unit (Optional)"
            value={apt}
            onChange={(e) => setApt(e.target.value)}
            placeholder="Apartment, suite, unit, building, floor, etc."
          />
        </div>

        <div>
          <Input
            label="City *"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
          {errors.city && <p className="text-red-600 text-xs mt-1">{errors.city}</p>}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Input
              label="State *"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="NY"
              maxLength={2}
            />
            {errors.state && <p className="text-red-600 text-xs mt-1">{errors.state}</p>}
          </div>
          <div>
            <Input
              label="ZIP Code *"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="10001"
              maxLength={10}
            />
            {errors.zipCode && <p className="text-red-600 text-xs mt-1">{errors.zipCode}</p>}
          </div>
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700 pt-1">
        <input
          type="checkbox"
          checked={isDefault}
          onChange={(e) => setIsDefault(e.target.checked)}
          className="rounded border-gray-300 text-amazon-amber focus:ring-amazon-amber"
        />
        <span>Make this my default shipping address</span>
      </label>

      <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <Button variant="primary" size="md" type="submit">
          Save and Use Address
        </Button>
      </div>
    </form>
  );
};
