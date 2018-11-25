export class StatusHandler {

	static errorHandler(status) {
		let error = "";

		switch (status) {
			case "404":
				error = "Requisição não encontrada ou não disponivel";
				break;			
			case "400":
				error = "Erro de requisição consulte os dados enviados";
				break;
			case "500":
				error = "Erro no servidor, tente novamente mais tarde";
				break;				
			default:
				error = "Erro no servidor, tente novamente mais tarde";
				break;
		}

		return error;
	}
}