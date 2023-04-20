import axios from 'axios';

const URL = 'http://localhost:3000/api/chat';

export const askBigBrother = async (question) => {
  try {
    const response = await axios({
      url: URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        question,
      }),
    });
    const data = await response.data;
    return data.text;
  } catch (error) {
    console.log('error', error);
  }
};

// result text --> use this as prepprompt to craft emails
//Based on the context provided, Emergent Layer is a platform that enables users to easily connect all of their financial and operational data sources to create automated workflows. Some problems that a finance manager may face that Emergent Layer can help solve for include the need to manually gather and consolidate data from various sources, the need to perform repetitive tasks, and the need to ensure compliance with legal and regulatory requirements. By using Emergent Layer, a finance manager can benefit from features such as the ability to integrate data sources like bank accounts, accounting systems, CRMs, ERPs, and databases, the ability to assemble workflows with drag-and-drop logic blocks, Excel formulas, or Python/SQL scripts, and the ability to automate tasks and ensure compliance. The value proposition of Emergent Layer for a finance manager is that it can save time, reduce errors, increase efficiency, and improve compliance, ultimately leading to better financial outcomes for the organization.
