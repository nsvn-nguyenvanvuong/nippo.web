package com.nittsu.nippo.infra.manager;

import java.io.Serializable;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class EntityManagerLoader implements Serializable {
	private static final long serialVersionUID = 1L;

	@PersistenceContext(name = "NIPPO")
	private EntityManager factory;

	public EntityManager getEntityManager() {
		return this.factory;
	}
}
