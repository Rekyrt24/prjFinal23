package com.example.senai.PrjFinal.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.senai.PrjFinal.entities.FinalGame;
import com.example.senai.PrjFinal.repositories.FinalGameRepository;

@Service
public class FinalGameService {

	private final FinalGameRepository finalGameRepository;

	@Autowired
	public FinalGameService(FinalGameRepository finalGameRepository) {
		this.finalGameRepository = finalGameRepository;
	}

	// preparando as buscas por id
	public FinalGame getFinalGameById(Long id) {
		return finalGameRepository.findById(id).orElse(null);
	}

	// preparando a busca geral
	public List<FinalGame> getAllFinalGames() {
		return finalGameRepository.findAll();
	}

	// salvando o Jogo
	public FinalGame saveFinalGame(FinalGame finalGame) {
		return finalGameRepository.save(finalGame);
	}

	// excluindo o Jogo
	public void deleteFinalGame(Long id) {
		finalGameRepository.deleteById(id);
	}
	
}
