const blog1 = "/images/blog/medicalBillingSoftware.png";
const blog2 = "/images/blog/AIDigital.jpg";
const blog3 = "/images/blog/hmisPrescriptionSafety.jpeg";
const blog4 = "/images/blog/akhilSystemBlogImage.jpeg";
const blog5 = "/images/blog/AIPowered.jpeg";

// ✅ Function to generate slug from title
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

// Function to truncate text to 2 lines
const truncateDescription = (text, maxLines = 2) => {
  const words = text.split(" ");
  let lineCount = 0;
  let result = [];

  for (let word of words) {
    result.push(word);
    if (result.length % 10 === 0) {
      lineCount++;
    }
    if (lineCount >= maxLines) {
      return result.join(" ") + "...";
    }
  }

  return text;
};


// ✅ Export blogs so BlogDetails can use it too (important for reload / direct URL)
export const blogsData = [
   {
    title: "Why AI-Powered EMR Software for Clinics Is No Longer optional in 2026",
    desc: "Small clinics face a specific problem that large hospitals don't: they need enterprise-level efficiency without enterprise-level staff.",
    img: blog5,
    // fullContent: `...`
  },


  {
    title: "Redefining Patient Experience with AI Hospital Management Software",
    desc: "Today, patients evaluate hospitals on more than just medical results. Patients remember not only their diagnosis and clinical outcome, but also their waiting times, the clarity of communication, and the speed with which their concerns were resolved.",
    img: blog4,
    // fullContent: `...`
  },


   {
    title: "How this HMIS Software in India Makes Every Prescription Safer",
    desc: "Doctors write up dozens of prescriptions during their shifts, especially in busy OPDs, regularly. They take accountability not just for the right medicine, but also for the right dose, given to the right patient at the right time. However, medication errors are easy to slip through the cracks. They are silently costing clinics and hospitals millions in legal claims, patient complications, and subsequently tarnishing hospitals’ and doctors’ reputations. longer hospital stays.",
    img: blog3,
    // fullContent: `...`
  },
  
  {
    title: "How AI Is Redefining the Digital Front Door in Hospitals",
    desc: "Imagine a patient, having chest pain at 2 AM, reaching for their phone to type in nearest cardiologist. They come across your hospital in search results and open the website, but then abandon it midway. Why? Because there's no instant booking option, the requirements of documents are unclear, and phone menus are difficult to navigate. This is a sign of your digital front door failing, and silently, it has been costing hospitals 20–30% of potential revenue through no-shows and patient drop-offs.",
    img: blog2,
    // fullContent: `...`
  },
 
  {
    title: "Medical Billing Software",
    title2: "Transforming Healthcare Operations with Medical Billing Software",
    desc: "Medical billing software has become an essential tool for healthcare practitioners seeking to streamline their financial operations through innovative and emerging technologies.",
    desc2: "Many hospital software solutions in India now offer comprehensive, one-stop platforms that incorporate vital capabilities such as patient records, lab data, prescriptions, revenue cycle management, claim tracking, and more.",
    desc3: "Let us explore what medical billing software is, how it can benefit your healthcare practice, the different types of solutions available, and the essential features to consider when selecting the best billing software.",
    img: blog1,

    // ✅ fullContent add karna hai agar details page pe long content chahiye
    // fullContent: `<p>...</p>`
  },
  
  
].map((blog) => ({
  ...blog,
  slug: generateSlug(blog.title),
  shortDesc: truncateDescription(blog.desc),
}));
