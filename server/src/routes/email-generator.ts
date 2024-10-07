import express, { Request, Response } from "express";
import EmailGeneratorManager from "../business/email-generator";
import { requestValidator } from "../middleware/request-validator";
import { EmailGenerationSchema } from "../domain/schemas/email";

const router: express.Router = express.Router();

router.post(
  "/generate",
  requestValidator(EmailGenerationSchema),
  async (req: Request, res: Response) => {
    const {
      firstName,
      lastName,
      domain,
    }: { firstName: string; lastName: string; domain: string } = req.body;

    const generatedEmail = await new EmailGeneratorManager().generate({
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      domain: domain.toLowerCase(),
    });

    res.send(generatedEmail);
  }
);

export default router;
