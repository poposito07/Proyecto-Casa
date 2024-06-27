"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDoorState = getDoorState;
exports.updateDoorState = updateDoorState;
const resend_1 = require("resend"); // Importar Resend para enviar correos electrónicos
const doorService_1 = require("../../core/application/doorService");
const doorReporsitory_1 = require("../../infrastructure/database/doorReporsitory"); // Corregido: Nombre corregido del repositorio
const doorRepository = new doorReporsitory_1.DoorRepository();
const doorService = new doorService_1.DoorService(doorRepository);
// Configurar Resend con tu API Key
const resend = new resend_1.Resend('re_F9TjLm1Y_5rtAKKBviECKbbSX5muF867B'); // Reemplazar con tu API key de Resend
function getDoorState(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doorState = yield doorService.getDoorState();
            res.json(doorState);
        }
        catch (error) {
            console.error('Error obteniendo el estado de la puerta:', error);
            if (error instanceof Error) {
                res.status(500).json({ message: 'Error al obtener el estado de la puerta', error: error.message });
            }
            else {
                res.status(500).json({ message: 'Un error desconocido ocurrió' });
            }
        }
    });
}
function updateDoorState(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { state } = req.body;
        try {
            yield doorService.updateDoorState(state);
            // Enviar correo electrónico utilizando Resend cuando se actualice el estado de la puerta
            yield resend.emails.send({
                from: 'onboarding@resend.dev',
                to: '231205@ids.upchiapas.edu.mx', // Cambiar al correo específico deseado
                subject: 'Estado de la Puerta Actualizado',
                html: `<p>El estado de la puerta ha sido actualizado a: ${state}</p>`,
            });
            res.json({ message: 'Estado de la puerta actualizado exitosamente y correo electrónico enviado' });
        }
        catch (error) {
            console.error('Error actualizando el estado de la puerta:', error);
            if (error instanceof Error) {
                res.status(500).json({ message: 'Error al actualizar el estado de la puerta', error: error.message });
            }
            else {
                res.status(500).json({ message: 'Un error desconocido ocurrió' });
            }
        }
    });
}
