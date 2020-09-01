import { Router } from 'express'
import ForgotPasswordController from './../controllers/ForgotPasswordController';
import ResetPasswordController from './../controllers/ResetPasswordController';
import { celebrate, Segments, Joi } from 'celebrate'



const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();




passwordRouter.post('/forgot', celebrate({
  [Segments.BODY]: {
      email: Joi.string().email().required(),
  }
}),forgotPasswordController.create);


passwordRouter.post('/reset', resetPasswordController.create);



export default passwordRouter;
