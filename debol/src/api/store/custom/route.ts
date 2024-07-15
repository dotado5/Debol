// import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

// export async function GET(
//   req: MedusaRequest,
//   res: MedusaResponse
// ): Promise<void> {
//   res.sendStatus(200);
// }

import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { applySession } from "src/api/session";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    applySession(req as any, res as any, (err: any) => {
      if (err) return reject(err);
      resolve();
    });
  });

  // Now you can access the session object
  req.session.foo = 'bar';

  res.sendStatus(200);
}
