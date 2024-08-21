
const PDF = require("../modules/pdfdata");


module.exports.upload=async (req, res) => {
  const currUser=req.user;
    try {
      const pdfs = await PDF.findAll({ attributes: ['serialNO', 'name','createdAt'],order: [['createdAt', 'DESC']] });
      
      // res.render('./pdf/upload.ejs', { pdfs,currUser });
      res.status(200).json(pdfs);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching PDFs');
    }
  }


  function generateSerialNumber() {
    return Math.random().toString().slice(2, 20);
  }

module.exports.uploadrouter=async (req, res) => {
    try {
      const { originalname, buffer, mimetype } = req.file;
      const serialNO = generateSerialNumber();
  
      await PDF.create({
        name: originalname,
        data: buffer,
        contentType: mimetype,
        serialNO: serialNO,
      });
  
     res.status(200).send("The Bill Uploaded succefully")
    } catch (err) {
      console.error(err);
      res.status(500).send('Error saving PDF');
    }
  }

module.exports.pdf=async (req, res) => {
    try {
      const pdf = await PDF.findOne({ where: { serialNO: req.params.serialNO } });
      if (!pdf) {
        return res.status(404).send('PDF not found');
      }
      res.contentType(pdf.contentType);
      res.send(pdf.data);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching PDF',err);
    }
  }

module.exports.pdfdelete=async (req, res) => {
    const { serialNO } = req.params;
    try {
      const deletedPdf = await PDF.destroy({ where: { serialNO } });
  
      if (!deletedPdf) {
        return res.status(404).send('PDF not found');
      }
      res.status(200).send("the pdf is deleted")
    } catch (err) {
      console.error('Error deleting PDF:', err);
      res.status(500).send('Server Error');
    }
  }