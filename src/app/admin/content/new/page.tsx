import ContentForm from "@/components/admin/ContentForm";

export default function NewContentPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-terra-dark">Nuevo contenido</h1>
      <div className="mt-4">
        <ContentForm />
      </div>
    </div>
  );
}
