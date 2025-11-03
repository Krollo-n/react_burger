import {useState} from "react";

export const useFormData = (fields) => {
  const [form, setForm] = useState(fields)
  const change = (e) => {
    const name = e.target.name
    const value = e.target.value
    setForm({...form, [name]: value})
  }

  const reset = () => {
    setForm({...fields})
  }

  return {form, change, reset};
};