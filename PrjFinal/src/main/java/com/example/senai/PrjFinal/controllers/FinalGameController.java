package com.example.senai.PrjFinal.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.senai.PrjFinal.entities.FinalGame;
import com.example.senai.PrjFinal.services.FinalGameService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "jogos", description = "API REST DE GERENCIAMENTO DE JOGOS")
@RestController
@RequestMapping("/jogos")
public class FinalGameController {

	@Autowired
	private final FinalGameService finalGameService;

	@GetMapping("/home")
	public String paginaInicial() {
		return "index"; 
	}

	@Autowired
	public FinalGameController(FinalGameService finalGameService) {
		this.finalGameService = finalGameService;
	}
	
	 @PostMapping("/create")
	    public FinalGame createFinalGame(@RequestBody FinalGame finalGame) {
		 return finalGameService.saveFinalGame(finalGame);
	    }
	

	@GetMapping("/{id}")
	public ResponseEntity<FinalGame> getFinalGame(@PathVariable Long id) {
		FinalGame finalGame = finalGameService.getFinalGameById(id);
		if (finalGame != null) {
			return ResponseEntity.ok(finalGame);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping
	public List<FinalGame> getAllFinalGames() {
		return finalGameService.getAllFinalGames();
	}

	@DeleteMapping("/{id}")
	public void deleteFinalGame(@PathVariable Long id) {
		finalGameService.deleteFinalGame(id);
	}	
}