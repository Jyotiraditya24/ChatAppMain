export const sendMessage = (req, resp) => {
  try {
    const { message } = req.body;
    const { id } = req.params;
  } catch (error) {
    resp.status(500).json({ error: "Internal Server Error" });
  }
};
