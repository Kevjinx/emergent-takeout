import askGPT from '../gpt/askGPT.js';
import fs from 'fs';

const bigBroAnswer =
  'Emergent Layer can address the pain points of finance managers by enabling them to easily connect all of their financial and operational data sources to create automated workflows. This can save time and reduce errors in manual data entry and processing. The platform supports various types of data sources such as spreadsheets, databases, banking, payments, accounting, CRM, and human resources. Emergent Layer offers a drag-and-drop logic block, Excel formulas, or Python/SQL scripts to assemble workflows. Its value proposition includes the ability to integrate data sources, automate financial workflows, and provide a range of business management tools such as financial management, inventory management, CRM, and human resources.';

const prompt = `given the following answer from big brother: ${bigBroAnswer} \n, act as a sales person, and craft an email to a potential customer, keep it brief.`;

const writeEmails = async () => {
  const response = await askGPT(prompt);
  console.log(response);
  fs.writeFile('emails.txt', response, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

writeEmails();
