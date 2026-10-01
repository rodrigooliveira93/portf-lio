(function ($) {
	'use strict';

	var WHATSAPP_NUMBER = (typeof ht_ctc_chat_var !== 'undefined' && ht_ctc_chat_var.number)
		? ht_ctc_chat_var.number
		: '5511944740241';

	function isValidEmail(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
	}

	function buildMessage(data) {
		return [
			'Olá! Gostaria de entrar em contato.',
			'',
			'*Nome:* ' + data.nome,
			'*Telefone:* ' + data.telefone,
			'*E-mail:* ' + data.email,
			'',
			'*Mensagem:*',
			data.mensagem
		].join('\n');
	}

	function showMessage($container, html) {
		$container.find('.et-pb-contact-message').html(html).show();
	}

	$(function () {
		var $formContainer = $('#et_pb_contact_form_0');
		var $form = $formContainer.find('.et_pb_contact_form');

		if (!$form.length) {
			return;
		}

		$form.off('submit').on('submit', function (e) {
			e.preventDefault();

			var nome = $('#et_pb_contact_nome_0').val().trim();
			var telefone = $('#et_pb_contact_telefone_0').val().trim();
			var email = $('#et_pb_contact_e-mail_0').val().trim();
			var mensagem = $('#et_pb_contact_mensagem_0').val().trim();

			$form.find('.input').removeClass('et_contact_error');
			showMessage($formContainer, '');

			var errors = [];
			if (!nome) {
				errors.push('Nome');
			}
			if (!telefone) {
				errors.push('Telefone');
			}
			if (!email) {
				errors.push('E-mail');
			} else if (!isValidEmail(email)) {
				errors.push('E-mail inválido');
			}
			if (!mensagem) {
				errors.push('Mensagem');
			}

			if (errors.length) {
				if (!nome) {
					$('#et_pb_contact_nome_0').addClass('et_contact_error');
				}
				if (!telefone) {
					$('#et_pb_contact_telefone_0').addClass('et_contact_error');
				}
				if (!email || !isValidEmail(email)) {
					$('#et_pb_contact_e-mail_0').addClass('et_contact_error');
				}
				if (!mensagem) {
					$('#et_pb_contact_mensagem_0').addClass('et_contact_error');
				}
				showMessage(
					$formContainer,
					'<div class="et_pb_contact_error_text">Por favor, preencha os campos: ' + errors.join(', ') + '.</div>'
				);
				return;
			}

			var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(
				buildMessage({ nome: nome, telefone: telefone, email: email, mensagem: mensagem })
			);

			showMessage(
				$formContainer,
				'<div class="et_pb_contact_success_text">Abrindo o WhatsApp com sua mensagem...</div>'
			);

			window.open(url, '_blank');
		});
	});
})(jQuery);
