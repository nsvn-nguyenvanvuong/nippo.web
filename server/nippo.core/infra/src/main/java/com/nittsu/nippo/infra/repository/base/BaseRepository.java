package com.nittsu.nippo.infra.repository.base;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.nittsu.nippo.infra.manager.EntityManagerLoader;

public abstract class BaseRepository {
	@Inject
	private EntityManagerLoader loader;

	/**
	 * Returns EntityManager.
	 * 
	 * @return EntityManager
	 */
	public EntityManager getEntityManager() {
		return loader.getEntityManager();
	}
}
