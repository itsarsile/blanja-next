import EditAddressCards from "./EditAddressCards";

export default function ShippingAddress({ params }: { params: { id: number }}) {

  return (
    <div className="p-10">
      <EditAddressCards />
    </div>
  )
}
