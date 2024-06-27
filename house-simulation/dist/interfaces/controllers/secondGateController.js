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
exports.getSecondGateState = getSecondGateState;
exports.updateSecondGateState = updateSecondGateState;
const resend_1 = require("resend"); // Importar Resend para enviar correos electrónicos
const secondGateRepository_1 = require("../../infrastructure/database/secondGateRepository"); // Repositorio de la segunda puerta
const secondGateRepository = new secondGateRepository_1.SecondGateRepository();
// Configurar Resend con tu API Key
const resend = new resend_1.Resend('re_F9TjLm1Y_5rtAKKBviECKbbSX5muF867B'); // Reemplazar con tu API key de Resend
// Controlador para obtener el estado de la segunda puerta
function getSecondGateState(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const secondGateState = yield secondGateRepository.getSecondGateState();
            res.json(secondGateState);
        }
        catch (error) { // Asegura que TypeScript pueda inferir el tipo 'any' para 'error'
            console.error('Error obteniendo el estado de la segunda puerta:', error);
            res.status(500).json({ message: 'Error al obtener el estado de la segunda puerta', error: error.message });
        }
    });
}
// Controlador para actualizar el estado de la segunda puerta
function updateSecondGateState(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { state } = req.body;
        try {
            yield secondGateRepository.updateSecondGateState(state);
            // Enviar correo electrónico utilizando Resend cuando se actualice el estado de la segunda puerta
            yield resend.emails.send({
                from: 'onboarding@resend.dev',
                to: '231205@ids.upchiapas.edu.mx',
                subject: 'Estado de la Segunda Puerta Actualizado',
                html: `<p>El estado de la segunda puerta ha sido actualizado a: ${state}</p>`,
            });
            res.json({ message: 'Estado de la segunda puerta actualizado exitosamente y correo electrónico enviado' });
        }
        catch (error) {
            console.error('Error actualizando el estado de la segunda puerta:', error);
            res.status(500).json({ message: 'Error al actualizar el estado de la segunda puerta', error: error.message });
        }
    });
}
