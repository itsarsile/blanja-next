import EditProfileCards from "./EditProfileCards";

export default function Profile({ params }: { params: { id: number } }) {
  return (
    <div className="p-10">
      <EditProfileCards />
    </div>
  );
}
