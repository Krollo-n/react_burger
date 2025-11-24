import {useState, ChangeEvent} from "react";

export const useFormData = (fields: { [key: string]: string }) => {
  const [form, setForm] = useState(fields)
  const change = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setForm({...form, [name]: value})
  }

  const reset = () => {
    setForm({...fields})
  }

  return {form, change, reset};
};