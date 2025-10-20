"use client"
import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { Product, ProductData } from "image/types/product.type"
import Link from "next/link"

export default function SearchIcon() {
  const [open, setOpen] = useState(false)
  const [searchValue, setsearchValue] = useState(" ")
  const [productList, setproductList] = useState<Product[]>([])

  async function getdata() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`)
      const data: ProductData = await res.json()

      setproductList(data.data)

  }

  useEffect(() => {
    getdata()
  }, [])

  useEffect(() => {
      
  }, [productList])

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
      >
        <Search size={20} />
      </button>

    
      {open && (
        <div
          className="fixed inset-0 bg-black/50"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Search</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-600 hover:text-black"
          >
            ✕
          </button>
        </div>

        <div className="p-4">
          <input
            type="text"
            placeholder="Search.."
            value={searchValue}
            onChange={(e) => setsearchValue(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
          />

          <ul className="mt-4 space-y-2">
             {productList
              ?.filter((p) =>
                p.title.toLowerCase().includes(searchValue.toLowerCase().trim())
              )
              .map((p) => (
                <Link href={`/products/${p._id}`} onClick={()=>{
                    setOpen(false)
                }}>
                <li key={p._id} className="text-sm text-gray-700">
                  {p.title}
                </li>
                </Link>
                
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
