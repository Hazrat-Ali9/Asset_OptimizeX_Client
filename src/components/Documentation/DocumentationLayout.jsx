import Authentication from "./Authentication";
import DocumentNav from "./DocumentNav";
import OrgFeatures from "./OrgFeatures";
import OrganizationDoc from "./OrganizationDoc";
// Documentation Layout 
const DocumentationLayout = () => {
  return (
    <div className='bg-slate-900 text-slate-500 w-full overflow-hidden text-white-100'>
      <div className={`sm:px-16 px-6 flex justify-center items-center`}>
        <div className={`xl:max-w-[1280px] w-full`}>
          <DocumentNav className="border border-blue-600 relative" />
          <dir>
            <Authentication />
            <OrganizationDoc />
            <OrgFeatures />
          </dir>
        </div>
      </div>
    </div>
  );
}

export default DocumentationLayout