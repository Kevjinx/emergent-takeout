const prompts = {
  normalizeTitle: (title) => {
    return `Normalize the job title "${title}" and turn it into plural, and shorten it, only return one title back
    `;
  },
  askBigBro: (title) => {
    return `what are some problems that a finance manager would have that emergent layer can help solve for? What are some features that a ${title} would benefit from using. Be specific about the pain of the ${title}, and the value prop`;
  },
  bigBroToEmail: (bigBroAnswer) => {
    return `given the following answer from big brother: ${bigBroAnswer} \n, act as a sales person, and craft an email to a potential customer, keep it brief`;
  },
};

export default prompts;
